/* global fetch, L */
import React, { useEffect, useRef, useState } from 'react'
import Moment from 'moment'

const getRouteSummary = (locations) => {
  const to = Moment(locations[0].time).format('hh:mm DD.MM')
  const from = Moment(locations[locations.length - 1].time).format('hh:mm DD.MM')
  return `${from} - ${to}`
}

const generateColor = () => {
  return '#' + Math.random().toString(16).substr(-6);
}

const MapComponent = (props) => {
  const map = useRef()
  const [locations, setLocations] = useState()
  // Request location data.
  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((json) => {
        setLocations(json)
      })
  }, [])

  // TODO(Task 2): Request location closest to specified datetime from the back-end.
  const [markers, setMarkers] = useState()

  useEffect(() => {
    fetch(`http://localhost:3000/location/${props.date}`)
      .then(response => response.json())
      .then((json) => {
        setMarkers(json)
      })
  }, [])

  // Initialize map.
  useEffect(() => {
    map.current = new L.Map('mapid')
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const attribution = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    const osm = new L.TileLayer(osmUrl, {
      minZoom: 8,
      maxZoom: 12,
      attribution
    })
    map.current.setView(new L.LatLng(52.51, 13.40), 9)
    map.current.addLayer(osm)
  }, [])

  // Update location data on map.
  useEffect(() => {
    if (!map.current || !locations) {
      return // If map or locations not loaded yet.
    }

    // TODO(Task 1): Replace the single red polyline by the different segments on the map.
    const keys = Object.keys(locations.data);
    const locationData = locations.data;

    for (var i in keys) {
      const latlons = locationData[keys[i]].map(({ lat, lon }) => [lat, lon])
      const polyline = L.polyline(latlons,
        { color: generateColor() })
        .bindPopup(getRouteSummary(locationData[keys[i]]))
        .addTo(map.current)
      map.current.fitBounds(polyline.getBounds())
    }

    return () => map.current.remove(polyline)
  }, [locations, map.current])

  // TODO(Task 2): Display location that the back-end returned on the map as a marker.
  useEffect(() => {
    if (!map.current || !markers) {
      return // If map or markers not loaded yet.
    }
    markers.map(({ lat, lon }) => L.marker([lat, lon]).addTo(map.current))

    return () => map.current.remove()
  }, [markers, map.current])

  return (
    <div>
      {locations && `${locations.length} locations loaded`}
      {!locations && 'Loading...'}
      <div id='mapid' />
    </div>)
}

export default MapComponent
