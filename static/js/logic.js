// Store our API endpoint as queryUrl.
//let queryUrl = "http://127.0.0.1:5000/";


function init() {
    //  Grab a reference to the drop downs elect element.
    var selector = d3.select('#selDataset');

    //Use the list of country names to populate the select options
    d3.json("http://127.0.0.1:5000/api/v1.0/totalemissions").then((data) => {
        var countryNames = data.country;
        console.log(data)
        countryNames.forEach((sample) => {
            selector
              .append("option")
              .text(sample)
              .property("value", sample);
        });

        //Use the first country from the list to build the initial plots
        var firstCountry = countryNames[0];
        buildCharts(firstCountry);
        buildMetadata(firstCountry);
    });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
    d3.json("http://127.0.0.1:5000/").then((data) => {
    var metadata = data.coal;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
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
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("http://127.0.0.1:5000/").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sample_data = data.coal;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filter_data = sample_data.filter(sampleObj => sampleObj.id == sample);
    //console.log(filter_data)
    //  5. Create a variable that holds the first sample in the array.
    var filter_sample_array = filter_data[0]
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var iso = filter_sample_array.iso
    var year = filter_sample_array.year
    var sample_values = filter_sample_array.coal
    
    //console.log(otu_ids)
    //console.log(otu_labels)
    //console.log(sample_values)
    // 7. Create the yticks for the bar chart.
    // Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    
    var yticks = iso.slice(0,10).map(iso => `ISO ${iso}`).reverse()
    

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      type: "bar",
      orientation: "h",
      hovertext: year,
    }

    bardata = [trace]
    // 9. Create the layout for the bar chart. 
    var layout = {
      title: "Test",
      hovermode: "closest"
    }
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", bardata, layout)
  

// Bubble Graph Del 2

    // 1. Create the trace for the bubble chart.
    var trace2 = {
      x: iso,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: iso,
        colorscale: 'Jet'
      },
      type: 'scatter',
      hovertext: year
    };
    
    var bubbleData = [trace2];

    // 2. Create the layout for the bubble chart.
    var bubblelayout = {
      title: 'Test',
      showlegend: false,
      height: 500,
      width: 1000,
      hovermode: "closest",
      xaxis: {
        title: {
          text: 'test',
        }
      }
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubblelayout)
  
    console.log(data)
    //Filter the data for the object with the desired sample number
    var metadata = data.coal;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    });

  }







    
    
 
    
   

  
