// Store our API endpoint as queryUrl.
//let queryUrl = "http://127.0.0.1:5000/";



//Create array for the total emissions
function init() {
    //  Grab a reference to the drop downs elect element.
    var selector = d3.select('#selDataset');

    //Use the list of country names to populate the select options
    d3.json("http://127.0.0.1:5000/api/v1.0/finalemissions").then((data) => {
       
        
        //const countryArray = Array.from(countryNames);

        // console.log(countryNames.length);
        //console.log(countryNames[0]);
        /*if(Array.isArray(countryArray)) {
            console.log("It's an array");    
        }   else {
            console.log("NOT an array");
        }
        */
       const country = data.country;
       const total = data.total;

    //    country = data.map((row) => row.country);
    //    console.log(country)
 
        //trying to get country names into drop down list
        data.forEach((row) => {
            selector
              .append("option")
              .text(row.country)
              .property("value", row.country);
        });
        
        
       // for (let i = 0; countryArray.length; i++) {}

        //Use the first country from the list to build the initial plots
        
        
        var firstCountry = data[0];
        console.log(firstCountry)
        buildCharts(firstCountry);
        buildMetadata(firstCountry);

        
    
    });

   
} //init
// Initialize the dashboard
init();

function optionChanged(newCountry) {
  // Fetch new data each time a new country is selected
  buildMetadata(newCountry);
  buildCharts(newCountry);
  
}

// Demographics Panel 
function buildMetadata(row) {
    d3.json("http://127.0.0.1:5000/api/v1.0/finalemissions").then((data) => {
    var metadata = data;
    // Filter the data for the object with the desired country information
    var resultArray = metadata.filter(sampleObj => sampleObj.country == row);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}






    
    
 
    
   

  
