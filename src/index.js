

import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import mapStyles from './map-styles';


const sourceData = './gundata.json';

const scatterplot = () => new ScatterplotLayer({
    id: 'scatter',
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.longitude, d.latitude],
    getFillColor: d => d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],

    pickable: true,
    onHover: ({object, x, y}) => {
        const el = document.getElementById('tooltip');
        if (object) {
          const { n_killed, incident_id, categories, n_injured, date, notes, latitude, longitude } = object;
          el.innerHTML = `
          <h1>ID ${incident_id}</h1>
          <h1> ${n_injured} Injured </h1>
          <h1> ${n_killed} Killed </h1>
          <h1> Went down on ${date}</h1>
          <h1> ${notes} </h1>
          <h1> Lat: ${latitude}, Lng: ${longitude}  </h1>
          `


          el.style.display = 'block';
          el.style.opacity = 0.9;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        } else {
          el.style.opacity = 0.0;
        }
    },

    onClick: ({object, x, y}) => {
      window.open(`https://www.gunviolencearchive.org/incident/${object.incident_id}`)
    },
     
  });






window.initMap = () => {

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.0, lng: -100.0},
        zoom: 5,
        styles: mapStyles
    });

    const overlay = new GoogleMapsOverlay({
        layers: [
            scatterplot()
        ],
    });

    
    overlay.setMap(map);
    
}


