gloabl_data = [];

  // set the dimensions and margins of the graph
var margin = {top: 30, right: 10, bottom: 70, left: 60},
    width = 530 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#barchart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")


function update(dataset){
  var data = []
  console.log(dataset);
  selectedRegions.forEach(function(d) {
      data.push({group:d, value:dataset[2019 - selectedYear][d].trim()});
  });
  console.log(data);
  data.forEach(function(d) {
      d.value = parseInt(d.value);
  });
  // Update the X axis
  x.domain(data.map(function(d) { return d.group; }))
  xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) { return d.value }) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg.selectAll("rect")
    .data(data)

  u.enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
    .attr("x", function(d) { return x(d.group); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", "#69b3a2")

  // If less group in the new dataset, I delete the ones not in use anymore
  u
    .exit()
    .remove()
}


d3.csv("https://raw.githubusercontent.com/rauan-assabayev/data_visualisation/master/final_project/dataset/industry_2008_2019.csv").then(function(local_data) {
  gloabl_data = local_data;
  update(local_data)
})
.catch(function(error){
   console.log(error);  
})
