Jacob Briggs Seed Project 3
===========================

Instructions:
-------------
>1. Open 2 terminal windows
>2. In terminal window #1 run `npm i` in the project directory
>3. In terminal window #2 Run `mongod`
>4. In terminal window #1 Run `npm start` in the project directory
>5. Navigate to localhost:3000

Project Goals:
------
>- Allow User to Save an entire Game State in an object within the database.
>- Allow User to Load a Save from the database and continue play from Saved Game State.
>- Allow User to Delete any existing Saved Game.

Notes:
---
>- Each save is given a name, and when the user clicks the Load Game button the screen 
>  is populated with a button for each Game Save returned from the database. 
>- From the load screen you can also delete Game Saves.