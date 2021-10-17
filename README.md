Final assignment for Full Stack Development I course

STUDENTS:
Alwayne Bailey                                                                                             
101228834
Alwayne.Bailey@georgebrown.ca

Kasper Pawlowski
101367569
Kasper.Pawlowski@georgebrown.ca


HOW TO RUN OUR CHAT APPLICATION:
1. install the dependencies: npm install
2. run application: npm run start
3. open the browser and go to http://localhost:3000/ or other port if PORT environment variable specified
4. enjoy!

As MongoDB server is cloud hosted, to check events and chat history do the following:
1. open MongoDB Compass app
2. choose 'connect to' option
3. paste the following connection string: mongodb+srv://alkasp:alkasp@alkaspchat.rorsr.mongodb.net/AlkaspChat
4. upon successful connection choose AlkaspChat database
5. check Events and History collections




Required queries were written in separate files that can be found in folder 'queries'.
To run them use the following command:
node .\queries\retrieveEventLogs.js
node .\queries\retrieveChatHistory.js [-u user] [-r room]

retrieveEventLogs.js returns to the console all the event logs
retrieveChatHistory.js returns to the console all chat history according to the given parameters. Both of them are optional.

i.e.
node .\queries\retrieveChatHistory.js -u kasper 
returns chat history from user kasper

or

node .\queries\retrieveChatHistory.js -u Alwayne -r Developers 
returns chat history from user Alwayne in chat Developers




The chat is also hosted via Digital Ocean on:
157.230.105.204

However, it has to be investigated as the server drops clients connections if idle for more than a few seconds.
Some heartbeat mechanism would be needed.