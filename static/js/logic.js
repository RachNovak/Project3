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
        buildMetadata(firstCountry.country);
        buildCharts(firstCountry.country);

        
    
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

// 1. Create the buildCharts function.
function buildCharts(row) {
    // 2. Use d3.json to load and retrieve the emissions file 
    d3.json("http://127.0.0.1:5000/api/v1.0/finalemissions").then((data) => {
      // 3. Create a variable that holds the emissions array. 
      var sample_country = data;
      // 4. Create a variable that filters the samples for the object with the desired country
      var filter_data = sample_country.filter(sampleObj => sampleObj.country == row);
      //console.log(filter_data)
      //  5. Create a variable that holds the first sample in the array.
      var filter_sample_array = filter_data[0]
      
      //remove country in order to chart
      var no_country = filter_sample_array
      delete no_country.country
      var no_total = no_country
      delete no_total.total

    //   Object.entries(filter_sample_array).forEach(([key, value]) => {

    //   })
     
      let values = Object.values(no_total)
      let keys = Object.keys(no_total)

      // 8. Create the trace for the bar chart. 
      var trace = {
        x: keys,
        y: values,
        type: "bar",
        marker: {
            colors: "purple"
        },
        hovertext: values,
        //color: 
      }
  
      bardata = [trace]
      // 9. Create the layout for the bar chart. 
      var layout = {
        title: "Emissions by Type",
        hovermode: "closest", 
        height: 500,
        width: 500
      }
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", bardata, layout)

      var ultimateColors = [
        ['rgb(37,52,148)', 'rgb(44,127,184)', 'rgb(65,182,196)', 'rgb(161,218,180)', 'rgb(255,255,204)']
      ];


      var piedata = [{
        values: values,
        labels: keys,
        type: 'pie',
        marker: {
            colors: ultimateColors[0]
        }
      }];

      let layout2 = {
        height:500, 
        width: 700, 
        title: "Emissions by Type"
      };

      Plotly.newPlot("gauge", piedata, layout2);

      // // 1. Create the trace for the bubble chart.
      // var bubbleChart = [{
      //   x: keys,
      //   y: values,
      //   text: values,
      //   mode: "markers",
      //   marker: {
      //     size: values,
      //     color: values,
      //     colorscale: "Electric",
      //     opacity: 0.7,
      //   }, 
      //   type: 'scatter'
      // }];
      // // 2. Create the layout for the bubble chart.
      // var bubbleLayout = {
      //   title: "CO2 Emissions",
      //   height: 600, 
      //   width: 1200,
      //   xaxis: {title: "Emission Types"},
      //   hovermode: "closest",
      //   showlegend:false,
      //   showgrid:true
      // };
      // // 3. Use Plotly to plot the data with the layout.
      // Plotly.newPlot("bubble", bubbleChart, bubbleLayout);





      //Filter the data for the object with the desired sample number
      var metadata = data;
      var resultArray = metadata.filter(sampleObj => sampleObj.country == row);
      var result = resultArray[0];
      });
  
    }


    
    
 
    
   

  
