import React, { useState } from 'react'
import { GiPoloShirt, GiBilledCap, GiUmbrella, GiSnowflake1, GiMonclerJacket, GiLargeDress, GiHoodie, GiWinterGloves, GiArmoredPants } from 'react-icons/gi'
import { IconContext } from "react-icons"
import axios from 'axios';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  //const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},uk&APPID=b2a8763304dfe7e9849478f6e4413e53`
  const url = `http://api.weatherapi.com/v1/forecast.json?key=97135f007573481bb55223757223103&q=${location}&lang=es`

  const searchLocation = async (e) => {
    if (e.key === 'Enter') {
      await axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const firsIcon = () => {
    if (data.current.condition.code < 1029) {
      return (
        <GiBilledCap />
      )
    } else if (data.current.condition.code < 1209) {
      return (
        <GiUmbrella />
      )
    } else return (
      <GiSnowflake1 />
    )
  }

  const secondIcon = () => {
    if (data.forecast.forecastday[0].day.maxtemp_c > 27 && data.forecast.forecastday[0].day.mintemp_c > 15) {
      return (
        <>
          <GiPoloShirt />
          <GiLargeDress />
        </>
      )
    } else if (data.forecast.forecastday[0].day.maxtemp_c < 15 && data.forecast.forecastday[0].day.mintemp_c < 5) {
      return (
        <>
          <GiMonclerJacket />
          <GiWinterGloves />
        </>
      )
    } else {
      return (
        <>
          <GiHoodie />
          <GiArmoredPants />
        </>
      )
    }
  }


  return (
    <div className='app'>

      <div className='bar'>
        To Wear
      </div>

      <div className='container'>

        <div className='search'>
          <input
            value={location}
            placeholder='Enter location'
            onChange={(e) => {setLocation(e.target.value)}}
            onKeyPress={searchLocation}
            type="text"
          />
        </div>

        <div className='description'>
          {data.location ? <p className='bold'>{data.location.name}, {data.location.country}</p> : null}
          {data.current ? <p>{data.current.condition.text}</p> : null}
          {data.current ? <h1 className='bold'>{data.current.temp_c.toFixed()}°C</h1> : null}
          {data.forecast ? <p>Máxima: {data.forecast.forecastday[0].day.maxtemp_c.toFixed()}°C</p> : null}
          {data.forecast ? <p>Mínima: {data.forecast.forecastday[0].day.mintemp_c.toFixed()}°C</p> : null}
        </div>

        {data.current !== undefined &&
          <div className='wear'>
            <IconContext.Provider value={{ color: "white", size: "128" }}>
              {firsIcon()}
              {secondIcon()}
            </IconContext.Provider>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
