# spa-assignment
React login SPA

Pre-requisites:
1. NodeJs
2. Yarn

Clone the repo by running below command:
cmd> git clone https://github.com/sindhujakoganti/spa-assignment.git

Change the directory using below command:
cmd> cd spa-assignment

Start the application by running below command:
cmd> yarn && yarn start

React app will run in URL: http://localhost:3000/
NodeJs server will run in URL: http://localhost:9000/

click on Login Page - 
please enter the valid user name and user id and then click on Submit Button.

Sample users Available in Database - 
userid - 1, username - srikanth

userid - 2, username - sindhuja

Please use any of the above mentioned users to login.

Click on Home Page - It redirects to Dashboard Page

In Menu Bar, User Profile and LogOut Option are avaliable.

New Task Button - To Create The Tasks 
Edit Button - To Edit the task name
Delete Button - To Delete the task
Check Box - we can individually update for a specific task

Search Input Box - To Search for the Task Name in the Task List. 

Cards on top that shows the information of Tasks:
1. Tasks Completed
2. Latest 3 Tasks
3. Task Progress

#Api-Docs:
URL: http://localhost:9000/api-docs
First login with **/login** url and save the access-token returned in the response, which can be used for all other api-calls.
Using the access-token generated through **/login** api, we can hit the other APIs as per the swagger spec and play around with those APIs

#TODO:
1. Design improvements using CSS
