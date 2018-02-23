# A Facial Login Registration Implementation
FaceLogin is a login and registration app that uses facial recognition as a form of validation. The face recognition is done within the OpenCV framework in Python.

## Setting up Project and Dependencies
1. Clone this repository on your local machine:


    `git clone https://github.com/EmilChoparinov/FacialLogging`

2. Enter the directory **FacialLogging** (`cd ./FacialLogging`)

### Install npm packages
We must now install the servers and clients packages.

1. Navigate to **"./server/intermediary/"** and run the command: `npm install`
2. Navigate back to the root of the project by doing the command: **./../../../**
3. Now install the client's packages by navigating to **"./client/WebApp/"** and running the command: `npm install`

### Install python packages
We must now install the python dependencies in order to run the ml microservice. This was written in Python 3 so make sure Python 3
is install on your local machine
1. Navigate to: **"./server/ml/"**
2. Start a virtual environment in python3 by doing: `py -3 -m venv FaceLoginEnv`
3. Enter your virtual environment by running: `. ./FaceLoginEnv/Scripts/activate`
4. Install the requirements from **r.txt** using the command: `pip install -r r.txt`

## Running the Project
This project requires three things to be run:
1. Navigate from the root directory back into **"./client/WebApp/"** and run the command `ng build` note you must have angular cli tools installed globally or locally. Currently the package name is `@angular/cli`.
2. Once that finishes building, navigate from the root directory into **"./server/intermediary/"** and run the command `ts-node ./server.ts`. If everything is successful a listening message should be displayed.
3. Navigate from the root directory into **"./server/ml/"** and run the command `py -3 server.py`.
4. If the project is all up and running successfully attempt going to localhost on port 8000 and try it out!

## Architecture
- Implemented in the MEAN MVVC Architecture with a Flask microservice for OpenCV.
- Express is used as a proxy to the Python machine learning microservice that generates profiles and validates users. This architecture allows easy scalability due to how the microservice is setup.
- More info in this presentation [here](https://github.com/EmilChoparinov/FacialLogging/#).

###

This chart represents the logic happening between Angular, the Express proxy, and Flask:

<img src="https://i.imgur.com/mdqFSuz.png" alt="login confirm" width=400>

### Screenshots

**Contributors:** [@Ayadlin](https://github.com/ayadlin) [@Bhkangw](https://github.com/bhkangw) [@EmilChoparinov](https://github.com/EmilChoparinov/)
