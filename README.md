# Wide Networking
MERN Stack - Material UI

[Live website](https://connector-mern.netlify.app)

## Table of Contents
* [About The Project](#about)

* [Tech Stack](#tech-stack)

* [Work flow](#work-flow)

* [Getting started](#getting-started)

## About The Project
A web application platform to widen the networking. Logged in user can create profile, add posts and add comments. Guest user can view the other users' profile.

## Tech Stack
  * ##### MERN: MongoDB, Express, ReactJS, NodeJS
  * ##### Material-UI
  * ##### Mongoose
  * ##### JSON Web Token
  
## Work Flow
* User sign up or log in to access the Dashboard page

![Image](https://github.com/daniel-liemng/connector_mern/blob/master/client/src/assets/screenshot/Landing.PNG)

![Image](https://github.com/daniel-liemng/connector_mern/blob/master/client/src/assets/screenshot/Dashboard.PNG)

* Guest user can view all users' profile

![Image](https://github.com/daniel-liemng/connector_mern/blob/master/client/src/assets/screenshot/Profile.PNG)

* Logged user can create the profile, add posts and add comments

![Image](https://github.com/daniel-liemng/connector_mern/blob/master/client/src/assets/screenshot/AddExperince.PNG)

![Image](https://github.com/daniel-liemng/connector_mern/blob/master/client/src/assets/screenshot/Post.PNG)

## Getting started
**1.** In order to run this app, you need to have `node.js` installed.

**2.** `git clone https://github.com/daniel-liemng/connector_mern.git`

**3.** Install server-side and client-side dependencies

##### Environment variables

Create `.env` file in root folder

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.h5xct.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
JWT_SECRET=<JWT_SECRET>
GITHUB_CLIENT_ID=<GITHUB_CLIENT_ID>
GITHUB_CLIENT_SECRET=<GITHUB_CLIENT_SECRET>
```
Server-side

```
npm install
```
Client-side

```
cd client
npm install
```
Run app

```
npm run dev
```















  

