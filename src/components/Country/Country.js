import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css'; // Import the CSS file if needed
import data from './netflix_titles.csv'

function Country() {
  useEffect(() => {
    // Function to update the chart (moved from the <script> tag)
      // Set up the SVG for the bar chart

      if (document.getElementById("chart2").querySelector("svg")) {
        return;
      }
     
    function DataProcess(type,data){
        data = data.filter(d => d.country.trim() !== "");
     
        const uniqueCountries = data.filter(d => !d.country.includes(" ")) // Filtrer les données qui ne contiennent pas d'espace
        .map(d => d.country.split(/,|\s+/))
        .flat(); 
       
        const countriesList = Array.from(uniqueCountries);
        console.log(countriesList)
      
        const countsByCountry = {};

      
      countriesList.forEach(country => {
      countsByCountry[country] = { movies: 0, tvShows: 0 };
      data.forEach(item => {
          if (item.country === country) {
            if (item.type === "Movie") {
              countsByCountry[country].movies++;
            } else if (item.type === "TV Show") {
              countsByCountry[country].tvShows++;
            }
          }
        });
      });  
      const dataForBars = Object.keys(countsByCountry)
        .map(country => ({
        country,
        movies: countsByCountry[country].movies,
        tvShows: countsByCountry[country].tvShows,
        }))  

// Sort the data based on type (Movie or TV Show) and get the top 10 entries
        .sort((a, b) => {
            if (type === "Movie") {
            return b.movies - a.movies; // Sort by movies if type is Movie
            } else {
            return b.tvShows - a.tvShows; // Otherwise, sort by TV shows
            }
        })
        .slice(0, 10);


// Trier par le nombre total de films et d'émissions de télévision
// Sélectionner les dix premières entrées

        if (type=="Movie"){ 
        
            updateChart(data,dataForBars,0); 
            
        }else{
            
            updateChart(data,dataForBars,1);
            
        }
    }


    function updateContent(type) { 
        d3.csv(data).then(function(data) {  
        DataProcess(type,data);        
    }).catch(function(error) { 
        console.log("zeeeb");
        console.log("Error loading data: ", error);
      });
      } 
      
    const toggleButton2 = document.getElementById('toggleButton2');

    toggleButton2.addEventListener('click', function() {
      if (toggleButton2.value === 'Movie') {
        toggleButton2.innerText = 'Switch to Movies';
        toggleButton2.value = 'TV Show';
        updateContent("TV Show");
        
        
      } else {
        toggleButton2.value = 'Movie';
        toggleButton2.innerText = 'Switch to TV Shows';
        updateContent("Movie");
       
      }
    });

    



      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 1400;
      const height = 900;
  
      const svg = d3.select("#chart2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);






    function updateChart(d,dataForBars,value) {  
        
        
        svg.selectAll("*").remove();
        // Clear the existing chart
        
        const x = d3.scaleBand()
        .domain(dataForBars.map(d => d.country)) // Utiliser l'index comme domaine
        .range([0, width])
        .padding(0.1);
      
        
        let y = d3.scaleLinear()
      
        if(value==0){
            
            y.domain([0, d3.max(dataForBars, d => d.movies)])
            .range([height, 0]);
        }else{
            
            y.domain([0, d3.max(dataForBars, d => d.tvShows)])
            .range([height, 0]);
        }
        
      
       
        if(value==0){
            
            svg.selectAll(".movie-bar")
            .data(dataForBars)
            .enter().append("rect")
            .attr("class", "bar movie-bar")
            .attr("x", d => x(d.country)) // Utiliser l'index pour positionner x
            .attr("y", d => y(d.movies))
            .attr("width", x.bandwidth() / 2)
            .attr("height", d => height - y(d.movies));
        }else{
         svg.selectAll(".movie-bar")
        .data(dataForBars)
        .enter().append("rect")
        .attr("class", "bar movie-bar")
        .attr("x", d => x(d.country)) // Utiliser l'index pour positionner x
        .attr("y", d => y(d.tvShows))
        .attr("width", x.bandwidth() / 2)
        .attr("height", d => height - y(d.tvShows));
        }
        
       
      
          
          // ...
      // Add labels
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text") // Sélectionnez tous les éléments texte de l'axe des x
        .attr("fill","black") // Définissez l'ancre du texte sur "end"
        .attr("dx", "20px") // Déplacez légèrement le texte vers la gauche pour qu'il soit aligné avec l'axe
        .attr("dy", "0px") // Déplacez légèrement le texte vers le haut pour qu'il soit aligné avec l'axe
        .attr("transform", "rotate(90)"); // Faites pivoter le texte de 90 degrés dans le sens contraire des aiguilles d'une montre
      
      
      
    svg.append("g")
              .call(d3.axisLeft(y).ticks(10, "s"))
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .attr("text-anchor", "end")
              .attr("fill: red")
              .text("Count");
    
    }

    
    updateContent("Movie");




  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
     
      <button id="toggleButton2" value="Movie">Switch to TV Shows</button>
      <div id="chart2"></div>
    </div>
  );
}

export default Country;

