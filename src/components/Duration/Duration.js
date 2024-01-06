import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css'; // Import the CSS file if needed
import data from './netflix_titles.csv'

function Duration() {
  useEffect(() => {
    // Function to update the chart (moved from the <script> tag)
      // Set up the SVG for the bar chart

      if (document.getElementById("chart").querySelector("svg")) {
        return;
      }
     
     


      
  
        // Position the tooltip near the mouse pointer
  
      // Function to hide the tooltip
      






      function updateContent(type) {
        let x; 
        let currentType;
        currentType = type; // Mettre à jour le type de contenu actuel
        d3.csv(data).then(function(data) { 
          console.log(data)
          if (type === "Movie") {
           
             x = data.filter(d => d.type === "Movie" && d.duration && d.duration.trim() !== ""); 
             
            
          } else if (type === "TV Show") {
             x = data.filter(d => d.type === "TV Show" && d.duration !== "" && d.duration.trim() !== "");
          }
          // Mettre à jour le graphique avec les nouvelles données
          updateChart(x);
        }).catch(function(error) {
          console.log("Error loading data: ", error);
        });
      } 
      
    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', function() {
      if (toggleButton.value === 'Movie') {
        toggleButton.innerText = 'Switch to Movies';
        toggleButton.value = 'TV Show';
        updateContent("TV Show");
        
        
      } else {
        toggleButton.value = 'Movie';
        toggleButton.innerText = 'Switch to TV Shows';
        updateContent("Movie");
       
      }
    });
    // ... (code for setting up the toggleButton event listener and initial content)





    // Initial update with "Movie" type
    updateContent("Movie");



      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 1400;
      const height = 900;
  
      const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);






    function updateChart(t) {
      // ... (code for updating the chart) 
      console.log(t);
      // Extraire la première partie de la durée avant l'espace
      t.forEach(movie => {
        const durationParts = movie.duration.split(" ");
        if (durationParts.length > 0) { // Check if durationParts has at least one element
          movie.duration = parseInt(durationParts[0]);
        } else {
          // Handle the case where durationParts is empty or null
          console.error("Invalid duration format:", movie.duration);
        }
      });
     
      t.sort((a, b) => a.duration - b.duration);
      const topMovies = t.slice(-10).reverse();


      svg.selectAll(".movie-bar").remove();
      svg.selectAll("*").remove();
      // Set up the scales

      const x = d3.scaleBand()
        .domain(topMovies.map(d => d.title)) // Utiliser l'index comme domaine
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(topMovies, d => d.duration)])
        .range([height, 0]);


      svg.selectAll(".movie-bar")
        .data(topMovies)
        .enter().append("rect")
        .attr("class", "bar movie-bar")
        .attr("x", d => x(d.title)) // Utiliser l'index pour positionner x
        .attr("y", d => y(d.duration))
        .attr("width", x.bandwidth() / 1.5)
        .attr("height", d => height - y(d.duration))
        .on("click",function(event,d){
          
          svg.selectAll(".movie-bar").attr("fill", "black")         
        })
        .on("mouseover", function (event, d) {
            d3.select("#chart")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("padding", "5px")
            .style("border", "1px solid black")
            .style("border-radius", "5px")
            .style("pointer-events", "none")
            .html(`<h1>${d.title}</h1><br>${d.description}<br> <h2>${d.country} </h2>`)})
        .on('mouseout', function (event, d) {
              d3.select(".tooltip").remove();
              // Add code to hide the movie description here
            });   


      // Add labels
      // ...
      // Add labels
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .attr("class", "x-axis")
        .selectAll("text") // Sélectionnez tous les éléments texte de l'axe des x
        .attr("fill", "white")
        .attr("width", 100)
        .attr("font-size", "20px")
        .attr("font-weight", "bold") // Définissez l'ancre du texte sur "end"
        .attr("dx", "0px") // Déplacez légèrement le texte vers la gauche pour qu'il soit aligné avec l'axe
        .attr("dy", "0px") // Déplacez légèrement le texte vers le haut pour qu'il soit aligné avec l'axe
        .attr("transform", "rotate(90) translate(-350,20)");

      svg.append("g")
        .call(d3.axisLeft(y).ticks(10, "s"))
        .append("text")
        .attr("class", "y-axis")
        .attr("transform", "rotate(-90)")
        .attr("dx", "0")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .attr("fill: red")
        .text("Count");
    }

    





  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Netflix Data Visualization</h1>
      <button id="toggleButton" value="Movie">Switch to TV Shows</button>
      <div id="chart"></div>
    </div>
  );
}

export default Duration;

