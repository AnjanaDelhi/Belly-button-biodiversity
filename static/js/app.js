//Creating the bar graph
//Reading data
d3.json("./data/samples.json").then (data => {
  console.log(data);

  //otu_ids
  var otu_ids = data.samples[0].otu_ids;
  console.log(`otu_ids: ${otu_ids}`);

  //getting the 10 otu_ids as needed 
  var otu_10 = data.samples[0].otu_ids.slice(0, 10).reverse();
  var otu_id = otu_10.map(d => "OTU " + d);
  console.log(`otu_id: ${otu_id}`);

  //sample values
  var sampleValues = data.samples[0].sample_values.slice(0,10).reverse();
  console.log(`sampleValues: ${sampleValues}`);

  //otu labels
  var otu_labels =  data.samples[0].otu_labels.slice(0,10);
  console.log(`OTU_labels: ${otu_labels}`);

  //bar chart
  var trace1 = {
    x: sampleValues,
    y: otu_id,
    text: otu_labels,
    type:"bar",
    orientation: "h",
  };
  var data1 = [trace1];
  var layout = {
    title: "Top 10 OTU",
    yaxis: {
        tickmode:"linear",
    },
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 50
    }
  };
  Plotly.newPlot("bar", data1, layout);

  //Bubble chart
  var trace2 = {
    x: data.samples[0].otu_ids,
    y: data.samples[0].sample_values,
    mode: "markers",
    marker: {
        size: data.samples[0].sample_values,
        color: data.samples[0].otu_ids
    },
    text: data.samples[0].otu_labels

  };
  var data2 = [trace2];
  var layout2 = {
    title: "OTU Bubble chart",
    xaxis:{title: "OTU ID"},
    height: 500,
    width: 1000
  };
  Plotly.newPlot("bubble", data2, layout2); 

});




function demoInfo(sample) {
//Read samples.json
d3.json("./data/samples.json").then (data => {
    console.log(data);
    var metadata = data.metadata
    console.log(metadata)
    var demo = metadata.filter( item => item.id == sample);
    var person = demo[0]
    console.log(person)
    var demo_info = d3.select("#sample-metadata") 
    Object.entries(person).forEach(([key, value]) => {
      demo_info.append("h5").text(`${key}: ${value}`);
    });

    // var select_id = d3.select("#selDataset") 
    // Object.entries(person).forEach(([key, value]) => {
    // var names = data.filter(item => item.names)
    // console.log(names);
    // });
});
}

//function
var select_id = d3.select("#selDataset") 

d3.json("./data/samples.json").then (data => {
    console.log(data);
    var names = data.names
    console.log(names)
    names.forEach((name)=>{
    select_id.append("option").text(name).property("value", name);
    })
})
