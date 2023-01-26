# Serverless TODO
I developed and deployed a TODO application using AWS Lambda, the Serverless framework and React.js. This app will allow users to create/delete/update/get TODO items. 

## Table of Contents

* [Description](#Description)
* [Functions](#Functions)
* [Debugging](#Debugging)


## Description

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.


## Functions

* `Authentication` - I used Auth0 for authentication for users.

* `Auth` - I added a custom authorizer for API Gateway that should be added to all other functions.

* `GetTodos` - It returns all TODOs for a current user.

* `CreateTodo` - The current user can create a new TODO.

* `UpdateTodo` - The current user can update a TODO item he/she created.

* `DeleteTodo` - The current user can delete a TODO item he/she created.

* `UploadImage` - The current user can upload an attachment image for a TODO item.


## Debugging

* `Amazon CloudWatch` - I used Amazon CloudWatch to monitor my Amazon Web Services (AWS) resources and my application running on AWS in real time. 

* `Postman` - I made use of postman to test my API.
