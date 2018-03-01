from flask import Flask, jsonify, request
import io
import cv2
import base64 
import numpy as np
from PIL import Image
from pprint import pprint
import csv

app = Flask(__name__)



# Take in base64 string and return PIL image
def stringToImage(base64_string):
    imgdata = base64.binascii.a2b_base64(base64_string)
    #b64decode(base64_string)
    return Image.open(io.BytesIO(imgdata))

def toRGB(image):
    return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)

def equalize(image):
    # convert to yuv scale
    img_yuv = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2YUV)
    # equalize the histogram of the Y channel
    img_yuv[:,:,0] = cv2.equalizeHist(img_yuv[:,:,0])
    # convert the YUV image back to RGB format
    img_output = cv2.cvtColor(img_yuv, cv2.COLOR_YUV2BGR)
    return img_output

# create a CLAHE object (Arguments are optional).
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))

def localequalize(image):
    return clahe.apply(np.array(image))




def processBase64File(base64File):
    with open(base64File,'rt') as in_file:
        contents = in_file.read()
        i = contents.find(',')
        contents= contents[i+1:]
        imag = stringToImage(contents)
        imag = toRGB(imag)
        gray = cv2.cvtColor(imag,cv2.COLOR_BGR2GRAY)
        return gray

def processBase64String(base64String):
    i = base64String.find(',')
    base64String = base64String[i+1:] 
    base64Image = stringToImage(base64String)
    #base64Image = equalize(base64Image)
    base64Image = toRGB(base64Image)
    base64Gray = cv2.cvtColor(base64Image,cv2.COLOR_BGR2GRAY)
    base64Gray = localequalize(base64Gray)
    return base64Gray




def getFileContents():
    with open('trainer/trainer.yml','rt') as importFile: 
        contents = importFile.read()
        print(contents[0:100])
        return contents

@app.route('/', methods=['POST'])
def testing():
    return jsonify({'note': request.form['message']})


# generates yml from a set of images POST: //
# recieves
# {
#     images: Array<Base64String>(25);
# }

# Create Local Binary Patterns Histograms for face recognization
recognizer = cv2.face.LBPHFaceRecognizer_create()

# Using prebuilt frontal face training model, for face detection
detector = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")


def cleanForm(formData, imageCount):
    a = []
    curStr = 'images'
    for idx in range(imageCount):
        tempStr = curStr + '[' + str(idx) + ']'
        a.append(formData[tempStr])
    return a

def getIQR(arr):
    q75, q25 = np.percentile(arr, [75 ,25])
    return q25, q75, q75-q25


@app.route('/api/ml/build', methods=['POST'])
# get images from front end
#images = data[images]
def makeYML():
    print('in yml')
    images = cleanForm(request.form, 25)
    #process images from json base64 strings to numpy and assing id = 1.
    processImages = []
    ids = []
    for image in images:
        processImage = processBase64String(image)
        id =1
        #print(processImage)
        # Get the face from the training images
        faces = detector.detectMultiScale(processImage,1.2,8)

        # Loop for each face, append to their respective ID
        for (x,y,w,h) in faces:

            # Add the image to processImages
            processImages.append(processImage[y:y+h,x:x+w])

            # Add the ID to IDs
            ids.append(id)

    # Train the model using the faces and IDs
    recognizer.train(processImages, np.array(ids))

    # Save the model into trainer.yml
    recognizer.save('trainer/trainer.yml')
    #return

    print('model built')
    # return jsonify({'modelYML': 'fuck'})
    return jsonify({'modelYML': getFileContents()})


# verifies user and returns success boolean {success: true/false}
# recieves
# {
#     images: Array<Base64String>(5);
# }


@app.route('/api/ml/verify', methods=['POST'])
def verifyUser():
    print('in verify')
    # get trainer model from json and overwrite current:
    with open('trainer/trainer.yml','wt') as in_file:
        in_file.write(request.form['modelYML'])



    # Load the trained model
    recognizer.read('trainer/trainer.yml')

    # set up success counter
    #counter = 0
    #trials = 0.0
    ConfidenceArray =[]

    # define success - starts as False
    success = False

    #process images from json base64 strings to numpy and assing id = 1
    images = cleanForm(request.form, 5)
    for image in images:
        processImage = processBase64String(image)
        faces = detector.detectMultiScale(processImage, 1.2,8)

        # Loop for each face, append to their respective ID
        for (x,y,w,h) in faces:

           # Recognize the face belongs to which ID
            Id, confidence = recognizer.predict(processImage[y:y+h,x:x+w])
            print(Id)
            print(confidence)

        # only if we have a certain degree of confidence we add to avlidation counter
            try:
                #if confidence < 45:
                ConfidenceArray.append(confidence)
                #counter = counter+1
            except:
                pass
                #return jsonify({'success': False})
        #trials = trials + 1
    
    # if 3 out of 5 images are identified as user success is True
   
    try:
        q25, q75, iqr = getIQR(ConfidenceArray)
        if len(ConfidenceArray) > 2:
            filtered = [conf for conf in ConfidenceArray if (q25 - 1.5 * iqr < conf < q75 + 1.5 * iqr)]
            confidence = np.mean(filtered)
            print("Confidence: " + str(confidence))
            with open ('scores.csv','a') as score:
                writer = csv.writer(score,delimiter=',')
                writer.writerow((str(confidence), str(confidence<=50)))




    except:
        print("not enough images")
        return jsonify({'success': False})

    


    if confidence < 48:
        success =True
    print(success)

    
    
    # if counter/trials >= 0.6:
    #     success =True
    # print(success)


    return jsonify({'success': success})






app.run(port=1234 ,debug=True)
# app.run(host='0.0.0.0', port=1234,debug=True)