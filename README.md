<h1 align="center">Node.js YouTube bots comments remover</h1>

A Node.js application for the webbrowser that let's you remove unwanted comments on your own latest YouTube video. After setting up the project, it is only a few clicks away to remove unwanted comments on your own latest video.

<div align="center">
<br>
  <a href="https://github.com/nietjoost/Node.js-YouTube-bot-comments-remover/stargazers"><img src="https://img.shields.io/github/stars/nietjoost/Node.js-YouTube-bot-comments-remover" alt="Stars Badge"/></a>
  <a href="https://github.com/nietjoost/Node.js-YouTube-bot-comments-remover/network/members"><img src="https://img.shields.io/github/forks/nietjoost/Node.js-YouTube-bot-comments-remover" alt="Forks Badge"/></a>
  <a href="https://github.com/nietjoost/Node.js-YouTube-bot-comments-remover/pulls"><img src="https://img.shields.io/github/issues-pr/nietjoost/Node.js-YouTube-bot-comments-remover" alt="Pull Requests Badge"/></a>
  <a href="https://github.com/nietjoost/Node.js-YouTube-bot-comments-remover/issues"><img src="https://img.shields.io/github/issues/nietjoost/Node.js-YouTube-bot-comments-remover" alt="Issues Badge"/></a>
  <a href="https://github.com/nietjoost/Node.js-YouTube-bot-comments-remover/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/nietjoost/Node.js-YouTube-bot-comments-remover?color=2b9348"></a>
  <a href="https://github.com/nietjoost/Node.js-YouTube-bot-comments-remover/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nietjoost/Node.js-YouTube-bot-comments-remover?color=2b9348" alt="License Badge"/></a>
</div>

<br />

- [Setup](#setup)
  - [Install independencies](#install-independencies)
  - [Google credentials.json](#google-credentialsjson)
  - [Start web app](#start-web-app)
- [Q&A](#q--a)
  - [What is YouTube bots comments remover?](#what-is-youtube-bots-comments-remover)
  - [Will the Google OAuth 2.0 token be saved?](#will-the-google-oauth-20-token-be-saved)
- [Screenshots](#screenshots)
  - [Home page example](#home-page-example)
  - [Succes page example](#succes-page-example)

## Setup
#### Install independencies
Install the program NPM first. The software can be found here: https://nodejs.org/en/download/. <br>
The command below needs to be entered in a command line either on Windows or Linux. 
```
git clone https://github.com/nietjoost/Node.js-YouTube-bot-comments-remover.git
cd YouTube bots comments remover
npm install
```
<br />

#### Google credentials.json
The web app needs a file called 'credentials.json' in order to work. This file contains personal data from Google. Follow the tutorial <a href="https://docs.bettyblocks.com/en/articles/1012838-setting-up-google-oauth-2-0-authentication"> here </a> and use the following default data. (The links below can change depending on the project settings)
<br />  <br /> 
Redirect uris:
```
1: http://localhost:5000/google/callback
2: http://localhost:5000
```
Javascript origins:
```
1: http://localhost:5000
2: http://localhost
```

<br />

#### Start web app
The command below needs to be entered in a command line either on Windows or Linux. Note: the command line directory needs to be in the main folder in order to work.
```
npm start
```
The app will start on the given port. By default it is port 5000. The local url will be: 
```
http://localhost:5000/
```

<br />

## Q & A

#### What is YouTube bots comments remover?
Youtube bots comments remover is a webapplication that removes unwanted comments from the latest uploaded YouTube video from the loged-in user.

#### Will the Google OAuth 2.0 token be saved?
The OAuth 2.0 key, or any data in that matter, will not be saved anywhere. The key is used one time to retrieve the comments to maybe delete them later. You can also check the source code if you do not believe it. 

<br />

## Screenshots
#### Home page example
![Screenshot of the website](https://github.com/nietjoost/Node.js-YouTube-bot-comments-remover/blob/main/screenshots/Screenshot%201.png)

#### Succes page example
![Screenshot of the website](https://github.com/nietjoost/Node.js-YouTube-bot-comments-remover/blob/main/screenshots/Screenshot%202.png)
