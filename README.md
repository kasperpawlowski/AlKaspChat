Final assignment for Full Stack Development II course

STUDENTS:
Alwayne Bailey                                                                                             
101228834
Alwayne.Bailey@georgebrown.ca

Kasper Pawlowski
101367569
Kasper.Pawlowski@georgebrown.ca


HOW TO RUN OUR CHAT APPLICATION:
1. install the dependencies in both 'server' and 'react-app' folders by using the following command in each of them: npm install
2. run applications in both folders by using the following command in each of them: npm start
3. open the browser and go to http://localhost:3000/
4. click 'GO TO ADMIN DASHBOARD' button as this is where FS II assignment was implemented
5. Note that FS I assignment was rewritten with React
6. enjoy!

As MongoDB server is cloud hosted, to check events and chat history do the following:
1. open MongoDB Compass app
2. choose 'connect to' option
3. paste the following connection string: mongodb+srv://alkasp:alkasp@alkaspchat.rorsr.mongodb.net/AlkaspChat
4. upon successful connection choose AlkaspChat database
5. check Events and History collections




Required queries were written in separate files that can be found in folder 'server/queries'.
To run them use the following command:
node .\queries\retrieveEventLogs.js
node .\queries\retrieveChatHistory.js [-u user] [-r room]

retrieveEventLogs.js returns to the console all the event logs
retrieveChatHistory.js returns to the console all chat history according to the given parameters. Both of them are optional.

i.e.
node .\server\queries\retrieveChatHistory.js -u kasper 
returns chat history from user kasper

or

node .\server\queries\retrieveChatHistory.js -u Alwayne -r Developers 
returns chat history from user Alwayne in chat Developers