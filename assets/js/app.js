// @TODO: YOUR CODE HERE!
var width = parseInt(d3.select("#Scatter").style("width"));
var height = width - width / 4;
var margin = 20
var legend = 110;
var bottomPad = 40;
var leftPad = 40;

var svg = d3
    .select("#Scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

var markerSize;
function crGet() {
    if (width <= 530) {
        markerSize = 5;
    }
    else {
        markerSize = 10;
    }
}
crGet();

svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");
    xText.attr(
        "transform",
        "translate(" +
        ((width - legend) / 2 + legend) +
        "," +
        (height - margin - bottomPad) +
        ")"
    );

    xText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)");

var leftTextX = margin + leftPad;
var leftTextX = (height + legend) / 2 - legend;

svg.append("g").attr("class", "yText");
var yText = d3.select(".yText");
    yText.attr(
        "transform",
        "translate(" + leftTextX + "," + leftTextY + ")rotate(-90)"
    );

    yText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Lacking Healthcare (%)");

d3.csv("assets/data/data.csv").then(function(data) {
    visualize(data);
});

function visualize(scatter) {
    var curX = "poverty";
    var curY = "healthcare";

    var xMin;
    var xMax;
    var yMin;
    var yMax;

function xMinMax() {
    xMin = d3.min(scatter, function(d) {
        return parseFloat(d[curX]) * 0.90;
    });

    xMax = d3.max(scatter, function(d) {
        return parseFloat(d[curX]) * 1.10;
    });
}

xMinMax();
yMinMax();

var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + legend, width - margin]);
var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - legend, margin]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0" + (height - margin - legend) + ")");
svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + legend) + ",0)");

markers
    .append("cirlce")
    .attr("cx", function(d) {
        return xScale(d[curX]);
    })
    .attr("cy", function(d) {
        return yScale(d[curY]);
    })
    .attr("r", markerSize)
    .attr("class", function(d) {
        return "stateCircle " + d.abbr;
    })