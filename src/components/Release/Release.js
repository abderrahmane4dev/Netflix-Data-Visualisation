import * as d3 from 'd3';
import React, { useEffect } from 'react';
import data from './netflix_titles.csv';

function Release() {
  useEffect(() => {
    if (document.getElementById("lineChart").querySelector("svg")) {
      return;
    }
        // Load CSV data 
      
        d3.csv(data).then(function(data) { 
          const fakeData = [
            { release_year: 2000 },
            { release_year: 2001 },
            { release_year: 2001 },
            { release_year: 2002 },
            { release_year: 2002 },
            { release_year: 2002 },
            { release_year: 2003 },
            { release_year: 2003 },
            { release_year: 2003 },
            { release_year: 2003 },
          ];
          
          createLineChart(data);
          // Mettre à jour le graphique avec les nouvelles données
        }).catch(function(error) {
          console.log("Error loading data: ", error);
        });

      
    
          // Set up chart dimensions
          const margin = { top: 20, right: 20, bottom: 30, left: 40 };
          const width = 800 - margin.left - margin.right;
          const height = 400 - margin.top - margin.bottom;
        

 
        const svg = d3.select("#lineChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
        function createLineChart(data) {
          const parseYear = d3.timeParse("%Y");
          const parsedData = data.map(d => ({ ...d, date_added: d.release_year ? parseYear(`${d.release_year}`) : null }));
        
          // Remove entries with null date_added
          
          const filteredData = parsedData.filter(d => 
            d.date_added !== null && 
            d.date_added.getFullYear() >= 1970 && 
            d.date_added.getFullYear() <= 2021
          );
        
          // Sort the data by date_added
          filteredData.sort((a, b) => a.date_added - b.date_added);
        
          // Calculate counts for each release year of movies
          const movieCounts = d3.rollups(
            filteredData.filter(d => d.type === "Movie"), // Filter for movies
            v => v.length,
            d => d.date_added.getFullYear() // Get the year from date_added
          );
        
          // Calculate counts for each release year of TV shows
          const tvShowCounts = d3.rollups(
            filteredData.filter(d => d.type === "TV Show"), // Filter for TV shows
            v => v.length,
            d => d.date_added.getFullYear() // Get the year from date_added
          );
        
          // Combine counts into a single array for plotting
          const countsArray = Array.from(movieCounts, ([date, count]) => ({date:date.toString(), count }));
          const tvShowCountsArray = Array.from(tvShowCounts, ([date, count]) => ({ date:date.toString(), count }));
        

         
          // Create x and y scales
          const x = d3.scaleTime()
            .domain(d3.extent(countsArray, d => d.date.toString()))
            .range([margin.left, width - margin.right]);
        
          const y = d3.scaleLinear()
            .domain([0, d3.max(countsArray, d => d.count)])
            .nice()
            .range([height - margin.bottom, margin.top]);
        
          // Create line generators
          const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.count));
        
          const tvShowLine = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.count));
        
          // Create SVG
          
        
          // Add movie line to SVG
          svg.append("path")
            .datum(countsArray)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);
        
          // Add TV show line to SVG
          svg.append("path")
            .datum(tvShowCountsArray)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "red") // Choose a color for TV show line
            .attr("stroke-width", 1.5)
            .attr("d", tvShowLine);
        
          // Add x-axis
          svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));
        
          // Add y-axis
          svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));
        }
        
        // Assuming you have already loaded your data into a variable called `yourData`
        
        
     
    
    
    

      
      }, []);

  return (
    <div>
      <h1>Netflix Data Visualization</h1>
      <button id="toggleButton6" value="Movie">Switch to TV Shows</button>
      <div id="lineChart"></div>
    </div>
  );
}

export default Release;
