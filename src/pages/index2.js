import { useCallback } from "react";
import Navbar from '../components/Navbar/Navbar';
import Country from '../components/Country/Country';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; 
const pageStyle = {
   
  flexDirection: 'column',
  position:'absolute',
  zIndex: 99,
  height: '100vh', // Ensure the page takes up the entire viewport height
};

const particlesContainerStyle = {
  flex: 1,
  position: 'fixed', 
  zIndex: -1 // Allow the particles container to expand to fill the remaining space
};
export default function Page2() {
  const particlesInit = useCallback(async engine => {      
    await loadFull(engine);
  }, []);
  
  const particlesLoaded = useCallback(async container => {
  await console.log(container);
  }, []); 
    return (
        
        <div style={pageStyle}> 
    <div style={particlesContainerStyle}>

    <Particles
  id="tsparticles"
  init={particlesInit}
  loaded={particlesLoaded}
  options={{ "fullScreen": true, "background":{ "image":" linear-gradient(19deg, #7e76ff 0%, #0466ff 100%)" }, "particles":{ "number":{ "value":70, "density":{ "enable":false, "value_area":100 } }, "color":{ "value":"#00000" }, "shape": { "type": "square", "stroke":{ "width":0, "color":"#000000" }, "polygon":{ "nb_sides":15 } }, "opacity":{ "value":0.75, "random":true, "anim":{ "enable":false, "speed":40, "opacity_min":0.1, "sync":false } }, "size":{ "value":29, "random":true, "anim":{ "enable":false, "speed":2, "size_min":0.1, "sync":false } }, "line_linked":{ "enable":false, "distance":300, "color":"#ffffff", "opacity":0, "width":0 }, "move":{ "enable":true, "speed":0.5, "direction":"top", "straight":true, "out_mode":"out", "bounce":false, "attract":{ "enable":false, "rotateX":600, "rotateY":1200 } } }, "interactivity":{ "detect_on":"canvas", "events":{ "onhover":{ "enable":false, "mode":"repulse" }, "onclick":{ "enable":false, "mode":"push" }, "resize":true }, "modes":{ "grab":{ "distance":800, "line_linked":{ "opacity":1 } }, "bubble":{ "distance":790, "size":79, "duration":2, "opacity":0.8, "speed":3 }, "repulse":{ "distance":400, "duration":0.4 }, "push":{ "particles_nb":4 }, "remove":{ "particles_nb":2 } } }, "retina_detect":true}}
  />
   </div>
   <Navbar/>
   <Country/>
    </div>
 
    );
  }