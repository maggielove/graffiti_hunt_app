# artbeat

## Introduction  
An app that helps users find and share street art locations.

##Hosted Site
[link](https://graffiti-hunt.herokuapp.com/#/)

## User Stories
* As a user, I want to be able to view a  list of locations/addresses of works of street art that are within a walkable distance of each other.
* As a user, I want to be able to "check in" at each street art spot.
* (As a user, I want to be able to "like" a work of street art I've checked in at.)
* (As a user, I want to be able to take a photo at a new street art spot.)
* As a user, I want to be able to view the street art locations I've visited (along with accompanying photo and like information) whenever I log into the app.
* As a user, I want to gain points each time I check in at a new street art spot.
* As a user, when I've checked in to all the graffiti spots, I want to view a congratulatory message.

## Wireframe & screenshot of the app available here:
[link](https://github.com/maggielove/graffiti_hunt_app/issues/1)

## Technologies used: 
This is a Single-page MEAN application: 
    * **MongoDB** is the database  
    * Node.js (JavaScript runtime)  
    * Express is the framework for Node.js  
    * Angular is used to render data from the database on the front end.   
    * Angular UI-Router was used to display multiple views   
    * Google Maps JavaScript API: I used this API to display a Google Map, on which markers for all locations in the app's database are displayed.

## Approach: 
I initially envisioned this app as a game that would connect users to the street art in their city, an idea I'd like to come back to and integrate into a future version of this app. Ultimately, I ended up changing the concept of the app to make it primarily a way for users to find and share street art locations. These locations, along with descriptions, are added both to the Google Map (at the location at which the user entered the location) and to a list of locations in the database (along with an accompanying description, address, etc.) that is visible to the user on the site. 

## Unsolved Problems:  
In order to "check in" to a place with the Foursquare API, I needed an access token for the user logged in to my app. Following [these instructions](https://developer.foursquare.com/overview/auth) for "web server applications", I was able to get a code after allowing access to my Foursquare account, but I was not able to convert this code into a token. 

I also wanted to implement image uploads using [filestack](https://www.filestack.com/?fp=1). But when I was able to get the filepicker button to load, other functions needed at page load were no longer happenning. (Note: when I was using this on December 16, it was called filepicker--check API Key, code to see if there are changes to be made.) 

I'm having difficulty hiding the "edit" link when an item on the list is not being shown.

## Next Steps 
* User log in: store token locally (possibly using factories/ services)
* User log out
* Make the log in form disappear on verification of a user. 
* Make sure location coordinates are written in the place model in a way that matches the MongoDB standard. 
* Give the user the ability to add a place to a list of places s/he has visited.
* Give user ability to see how many people were there in total. 
* Give user the ability to upload pictures
* Let user comment on a post.
* Let user view a listing (and map markers) for street art near them (Geodist).
* Let user search for a place (name)
* Let a user "like" a street art location.  
* HTML: 
    * Single place view: Add labels information being displayed
* CSS:
    * Style the Google Map to be more reflective of art/ street art. 
 Add a scroll bar so users don't have to put mouse inside events window and scroll down.  
 In the navigation bar: Add styling so user knows instantly, visually, which "tab" she's viewing.
   
