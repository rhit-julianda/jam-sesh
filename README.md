# Distributed Jam Session

## Prerequisites

### Backend
The backend runs on python, you will need python as well as the websockets module:

pip install websockets

### Frontend
The backend will require yarn which requires npm

installing npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

installing yarn: npm -g install yarn

install packages in the Frontend/jam-sesh/ folder run: yarn install

serve: npm install -g serve

## Running

## Backend
Enter the Backend folder


Before running set your IP in Network/WebEngine.py:

line 74: async with websockets.serve(self.handle, YOUR_IP_HERE, 8765):
		
from the backend folder run python main.py

## Frontend
Enter the Frontend folder

before running set the backend IP in 

jam-sesh/src/Components/Session.js

line 11: const backendpath = "ws://YOUR_IP_HERE:8765";

then run: yarn build

then: serve -s build

you should be able to connect to the frontend and use the site at YOUR_IP_HERE:3000
