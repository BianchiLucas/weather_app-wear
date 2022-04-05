import React, { useState } from 'react'
import { GiPoloShirt, GiBilledCap, GiUmbrella, GiSnowflake1, GiMonclerJacket, GiLargeDress, GiHoodie, GiWinterGloves, GiArmoredPants } from 'react-icons/gi'
import { IconContext } from "react-icons"
import axios from 'axios'
import Modal from './modal'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&lang=es`

  const searchLocation = async (e) => {
    try {
      if (e.key === 'Enter') {
        await axios.get(url).then((response) => {
          setData(response.data)
        })
        setLocation('')
      }
    } catch (err) {
      setOpenModal(true)
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

    <div className='mainContainer'>

      <div className={(data.current) ? ((data.current.temp_c < 20) ? 'app cold' : 'app') : 'app'}>

        <div className='container'>

          <div className='search'>
            <input
              value={location}
              placeholder='Enter location'
              onChange={(e) => { setLocation(e.target.value) }}
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
              <IconContext.Provider value={{ color: "#F7CCAC", size: "7rem" }}>
                {firsIcon()}
                {secondIcon()}
              </IconContext.Provider>
            </div>
          }

        </div>

      </div>

      {openModal && <Modal closeModal={setOpenModal} />}

    </div>
  );
}

export default App;
