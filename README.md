# Partage

Partage is a simple chrome extension that allows you to easily share links with friends and family without navigating away from the tabs you are browsing. Instead, you can now simply send and receive links by opening the Partage popup, located in the top right corner of your browser.

Partage was developed as part of a 4 day hackathon at FullStack Academy in New York City, September 2017.

## Technologies

The Partage pop up was built with simple HTML, CSS and jQuery. It also incorporates socket.io for live rendering of notifications and new links being received by the user. User log-in and authentication is done through the built-in Chrome Indentity API.

On the back end, the server is set up using Express.js and uses PostgresQL and Sequelize to store and send user data. Fetch calls are done directly from the JS file on the front end.

One of the more interesting aspects of this project was the friend list. I wanted to make sure users had an easy access to their contacts by storing them as that user's 'friends'. I also wanted the users to only receive messages from their friends, to avoid spam. Thus, I architectured the application so that users need to have added each other as friends in order for links to be shared between them.  

Overall, this is a light-weight application that was very fun to build and really empower the users to communicate with each other in an easier way.

<img src="https://eseite47.github.io/img/partage/partage-mainScreen.png" width="280" display="inline"> <img src="https://eseite47.github.io/img/partage/partage-sendLink.png" width="280" display="inline"> <img src="https://eseite47.github.io/img/partage/partage-editProfile.png" width="280" display="inline">


## Download Partage

Partage will soon be available on the Chrome Web Store.

At the moment, you may download this code, unxip it, and upload it to your extensions by clicking the developer mode in the upper right corner of your screen.

## Contribute

I am always looking to improve Partage, and any suggestions or contributions are welcome. This is an open source project.
