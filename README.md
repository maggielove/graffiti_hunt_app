# ArtMapper

## Introduction  
An app that helps users find and share street art locations.

## Hosted Site
[link](https://graffiti-hunt.herokuapp.com/#/)

## User Stories
* As a user, I want to be able to view a  list of locations/addresses of works of street art that are within a walkable distance of each other.
* As a user, I want to be able to add a street art location to the map/ database.
* As a user, I want to be able to "like" a work of street art I've visited.
* As a user, I want to be able to take a photo at a new street art spot.
* As a user, I want to be able to view the street art locations I've visited (along with accompanying photo and like information) whenever I log into the app.

## Wireframe & screenshot of the app available here:
[link](https://github.com/maggielove/graffiti_hunt_app/issues/1)

## Technologies used: 
This is a Single-page MEAN application:   
    * MongoDB is the database  
    * Node.js (JavaScript runtime)  
    * Express is the framework for Node.js  
    * Angular is used to render data from the database on the front end.   
    * Angular UI-Router was used to display multiple views   
    * Google Maps JavaScript API: I used this API to display a Google Map, on which markers for all locations in the app's database are displayed.

## Approach: 
The goal of this app is to give users a way to find and share street art locations. These locations, along with descriptions, are added both to the Google Map (at the location at which the user entered the location) and to a list of locations in the database (along with an accompanying description, address, etc.), both of which are visible to the user on the site. 

## Unsolved Problems:  
I wanted to implement image uploads using [filestack](https://www.filestack.com/?fp=1), but I ran into issues with functions interfering with each other--most likely due to asynchronous functions.

## Next Steps 
* Make sure location coordinates are written in the place model in a way that matches the MongoDB standard. 
* Give user ability to see how many people were there in total. 
* Give user the ability to upload pictures
* Let user comment on a post.
* Let user view a listing (and map markers) for street art near them (Geodist).
* Let user search for a place (name)
* Let a user "like" a street art location. 

   
