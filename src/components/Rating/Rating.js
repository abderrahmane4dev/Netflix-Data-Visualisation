import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './style.css'; // Import the CSS file if needed
import data from './netflix_titles.csv';

function Rating() {
  const [ratingsData, setRatingsData] = useState([]);

  useEffect(() => {
    // Function to update the chart
    function updateChart(data) {
        const existingSvg = d3.select("#pieChart").select("svg");

  if (!existingSvg.empty()) {
    // If the SVG already exists, update the chart instead of appending a new one
    // ...
    return; // Exit the function early to prevent appending a new SVG
  }
      const ratingsCount = d3.rollup(
        data,
        v => v.length,
        d => d.rating
      );

      const ratingsData = Array.from(ratingsCount, ([rating, count]) => ({ rating, count }));

      // Now ratingsData contains an array of objects with rating and count properties
      setRatingsData(ratingsData);

      // Create the pie chart using ratingsData
      const width = 500;
      const height = 500;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal()
        .domain(ratingsData.map(d => d.rating))
        .range(d3.schemeCategory10);

      const svg = d3.select("#pieChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const pie = d3.pie()
        .value(d => d.count);

      const data_ready = pie(ratingsData);

      svg.selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr('fill', d => color(d.data.rating))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function (event, d) {
            d3.select("#pieChart")
            .append("div")
            .attr("class", "tooltip2")
            .style("position", "absolute")
            .style("padding", "5px")
            .style("border", "1px solid black")
            .style("border-radius", "5px")
            .style("pointer-events", "none")
            .html(`<h1>${d.data.rating}</h1><br> <h2>${d.data.count} </h2>`)})
        .on('mouseout', function (event, d) {
              d3.select(".tooltip2").remove();
              // Add code to hide the movie description here
            }); 


        svg.selectAll('pieText')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => `${d.data.rating}`)
        .attr('transform', d => `translate(${d3.arc().innerRadius(0).outerRadius(radius).centroid(d)})`)
        .style('text-anchor', 'middle')
        .style('font-size', '12px');  
    }

    // Load CSV data and update the chart
    d3.csv(data).then(data => {
      updateChart(data);
    }).catch(error => {
      console.log("Error loading data: ", error);
    });

  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Netflix Data Visualization</h1>
      <button id="toggleButton2" value="Movie">Switch to TV Shows</button>
      <div id="pieChart"></div>
    </div>
  );
}

export default Rating;
