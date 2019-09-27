import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import MapComponent from './map_component'
import Picker from 'react-datetime-slider-picker';
import './styles.css'

var date = '2019-07-23T18:25:52.148Z';
const onSave = (date, time) => {
  date = '2019-05-30T18:25:52.148Z'
}

const Index = () => {

  return (
    <div>
      <div className='header'>
        <h1>Welcome to the example task!</h1>
      </div>
      {/* TODO(Task 2): Add a slider to select datetime in the past.
        Pass the selected value as prop to the MapContainer */ }
      <Picker onSave={(date, time) => onSave(date, time)} />
      <MapComponent date={date} />
    </div>)
}

ReactDOM.render(<Index />, document.getElementById('main-container'))
