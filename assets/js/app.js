// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var scatterPlot = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv")
  .then(function(stateData) {


    stateData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.healthcare = +data.healthcare;
      data.smokes = +data.smokes;
      data.abbr = data.abbr;
    });

    var xText = d3.scaleLinear()
      .domain([8, d3.max(stateData, d => d.poverty)])
      .range([0, width]);

    var yText = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.healthcare)])
      .range([height, 0]);


    var xAxis = d3.axisBottom(xText);
    var yAxis = d3.axisLeft(yText);

    scatterPlot.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    scatterPlot.append("g")
      .call(yAxis);


    var markers = scatterPlot.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xText(d.poverty))
    .attr("cy", d => yText(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".25");

    var labels = scatterPlot.selectAll("text")
    .data(stateData)
    .enter()
    .append("text")
    .style("fill", "black")
    .attr('x',d => xText(d.poverty))
    .attr('y',d => yText(d.healthcare))
    .attr("dy", ".35em") 
    .attr("text-anchor", "middle")
    .text(d => d.abbr);
    console.log(stateData)


    scatterPlot.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 43)
      .attr("x", 0 -275)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    scatterPlot.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  });