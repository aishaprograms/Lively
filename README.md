# Lively
Lively is a webapp that teaches you how to boost your energy levels everyday through healthy food and exercise suggestions. 
Heroku App: https://lively-app.herokuapp.com/

## Screenshots
<img width="1280" alt="screen shot 2016-11-30 at 1 25 38 pm" src="https://cloud.githubusercontent.com/assets/20719058/20768010/ed3ec158-b701-11e6-9269-bb1ef930dd75.png">

## Technologies used
- Firebase
- Materialize CSS
- Youtube API and Edamam API
- Slick.js
- UI Gradients

## Getting Started
Download the source code for testing purposes only from https://github.com/aishaprograms/Lively

## Built With
* Sublime text

## Walk throughs of code
index.html has all the code for the questionnaire forms and info sections
eatapp.js uses the firebase database JSON to populate the "Eat" section info cards and Edamam.API with Ajax calls to populate the recipe cards
moveapp.js uses YouTube.API with paramaters including channel IDs, search terms, and strict safe search to embed a video in the "Move" section
foods.json is the JSON which contains the name, info, and img of each food item
effects.js dynamically alters the website and initializes dynamic elements
style.css customizes the website on top of the CSS framework provided by Materialize

## Authors
* **Aisha Ahmad** - *Javascript management* - [Aisha Ahmad](https://github.com/aishaprograms/)
* **Hadi Yousufi** - *Front-end design, Food Info Cards* - [Hadi Yousufi](https://github.com/hadicodes)
* **Terence Ro** - *Exercise Section* - [Terence Ro](https://github.com/terencero)
* **Josh Kim** - *Food Recipe Cards* - [Joshua Kim](https://github.com/jimkosh)
