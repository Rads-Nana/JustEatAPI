const express = require("express");
const app = express();
const https = require("https");

const PORT = 443;

//check server is running
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});

//GET request
app.get("/restaurants/:postcode", (req, res) =>{
        const { postcode } = req.params;

        const options = {
            hostname: "uk.api.just-eat.io",
            path: `/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Tenant": "uk",
                "User-Agent": "Node.js HTTPS Client"
            }
        };
        
        //https GET request using options 
        const request = https.get(options, (response) => {
            let data = "";

            console.log("Response Status Code:", response.statusCode);

            response.on("data", (chunk) => {
                data += chunk;
            });

            response.on("end", () => {
                try {
                    //parse to JSON
                    let responseData = JSON.parse(data);

                    if(responseData && responseData.restaurants) {
                        const restaurantDetails = Object.values(responseData.restaurants);

                        //slice data to retrieve only the first ten
                        const topTenRestaurants = restaurantDetails.slice(0, 10);

                        console.log(topTenRestaurants);

                        //extract required data as objects for each (name, cuisine, postcode, rating)
                        const extractedData = topTenRestaurants.map(restaurant => {
                            ({
                                name: restaurant.name,
                                cuisines: restaurant.cuisines,
                                address: restaurant.address.postalCode,
                                rating: restaurant.rating.startRating,
                            });
                        });

                        //display extracted data
                        const displayExtractedData = ((extractedData) => {
                            extractedData.forEach(restaurant => {
                                console.log(`${restaurant.name}:`);
                                console.log(`    Cuisines: ${restaurant.cuisines.join(", ")}`);
                                console.log(`    Address: ${restaurant.address}`);
                                console.log(`    Rating: ${restaurant.rating}`);
                                console.log(""); 
                            });    
                        });

                        //call function to display data
                        displayExtractedData(extractedData);

                        //response
                        res.status(200).json(extractedData);
                        
                    }   //else statement if restaurant data not found throw error
                        else {
                            throw new Error("Restaurant data was not found");
                        }
                } catch (error) {
                    console.error("Error parsing or extracting the restaurant data", error.message);
                    res.status(500).json({ error: "Internal Service Error"});
                }
            });
            //request error to check if failed HTTPS
            request.on('error', (error) => {
                console.error(`Error making HTTPS request: ${error.message}`);
                res.status(500).json({ error: "Error making HTTPS request" });
        });
});