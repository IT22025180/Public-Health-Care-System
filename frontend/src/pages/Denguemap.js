<<<<<<< HEAD
import React, { useState } from 'react'
=======
import React, { useState } from 'react';
>>>>>>> dc5eaa55 (manuji)
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 7.8731, // Latitude of Sri Lanka
  lng: 80.7718 // Longitude of Sri Lanka
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBrN5oNsyq-P0wZaS9wsHshYFoHuuvnhis" // Replace with your Google Maps API key
  });

<<<<<<< HEAD
  const [map, setMap] = React.useState(null);
  const [markers, setMarkers] = useState(() => {
    const savedMarkers = localStorage.getItem('markers');
    return savedMarkers ? JSON.parse(savedMarkers) : [];
  });
=======
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
>>>>>>> dc5eaa55 (manuji)

  const addMarker = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      id: markers.length // Assign a unique ID to each marker
    };

<<<<<<< HEAD
    // Update markers state and save to localStorage
    setMarkers((prevMarkers) => {
      const updatedMarkers = [...prevMarkers, newMarker];
      localStorage.setItem('markers', JSON.stringify(updatedMarkers));
      return updatedMarkers;
    });
=======
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
>>>>>>> dc5eaa55 (manuji)
  };

  const toggleMarker = (markerId) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId ? { ...marker, visible: !marker.visible } : marker
      )
    );
  };

<<<<<<< HEAD
=======
  const handleSearch = () => {
    console.log('Perform search for:', searchInput);
    setSearchInput('');
  };
>>>>>>> dc5eaa55 (manuji)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
<<<<<<< HEAD
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={addMarker}

    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => toggleMarker(marker.id)}
          visible={marker.visible !== undefined ? marker.visible : true}
        />
      ))}
      <></>
    </GoogleMap>
  ) : <></>
=======
    <div>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search location..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={addMarker}
        options={{
            streetViewControl:false,
            mapTypeControl:false
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => toggleMarker(marker.id)}
            visible={marker.visible !== undefined ? marker.visible : true}
          />
        ))}
        <></>
      </GoogleMap>
    </div>
  ) : <></>;
>>>>>>> dc5eaa55 (manuji)
}

export default MyComponent;