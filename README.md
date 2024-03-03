# JustEatAPI

Just Eat API Console Application
This is a console application created using the JustEat API. It allows users to search for restaurants by postcode and view a list of ten restaurants, including their names, cuisines, postcodes, and star ratings. This application requires the use of Node.JS. 

Features
1) Search for Restaurants by using the Postcode
2) Displays a list of ten restaurants with details
-  Restaurant Name
-  Cuisine Types
-  Postcode
-  Star Rating (out of 5)


Prerequisites
Before running the application, please ensure you have the following installed:
Node.js 
Express 


Steps for Installation
1) git clone https://github.com/rad-1994/JustEatAPI.git
2) Install dependencies "npm install"


Starting the Console App
1) Navigate to the appropriate directory
2) In the terminal, run "node index.js"
3) Open a web browser and go to http://localhost:443/restaurants/{postcode}, replacing {postcode} with the desired postcode
4) Alternatively, view the displayed restaurant data in the terminal 


● During this project, there were several assumptions made:
- The rating used was assumed to be the star rating
- The address provided on the displayed data was assumed to be just the postcode, opposed to the full address
- This application is based on UK restaurants only 


● Include any improvements you’d make to your solution:
- I would improve the presentation of the data which has been displayed
- I would provide more accurate and clear error handling messages
- I would add additional error messages to account for invalid postcodes, prompting the user to double-check the postcode has been correctly entered
