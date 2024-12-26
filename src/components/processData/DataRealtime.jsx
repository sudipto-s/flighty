import React, { useEffect, useContext } from 'react'
import { countryName, countryFlag, airlineFlag, UTCtoIST, sortFlight } from "../helper/Helper"
import { AppContext } from '../../context/AppContext'

const DataRealtime = ({ sort }) => {
   const { globalData: data, setGlobalData } = useContext(AppContext)
   const dts = data?.response

   useEffect(() => {
      if (sort && dts) {
         const sortedData = sortFlight(sort, dts)
         setGlobalData(prevData => ({ ...prevData, response: sortedData}))
      }
   }, [sort, dts, setGlobalData])
   
   return (
      <div className="DataRealtime">
         { data?.error ? <b className="error-text">{ data.error.message }</b> :
            !dts?.length ? <b className="error-text">No data found!</b> :
            <div id="data">
               {dts.map((d, i) => (
                  <div key={i}>
                  { d.reg_number ? <>Registration: <b>{d.reg_number}</b><br/></> : null }
                  { d.reg_number ? <>Flag: <b>{countryName(d.flag)} {countryFlag(d.flag)}</b><br/></> : null }
                  { d.lat ? <>Position: <b>{d.lat.toFixed(2)}, {d.lng.toFixed(2)}</b><br/></> : null }
                  { d.alt ? <>Altitude: <b>{(d.alt*3.28).toFixed(0)} ft</b><br/></> : null }
                  { d.dir ? <>Direction: <b>{d.dir}°</b><br/></> : null }
                  { d.speed ? <>Speed: <b>{d.speed} Kmph</b><br/></> : null }
                  { d.v_speed ? <>Speed: <b>{d.v_speed} Kmph</b><br/></> : null }
                  { d.squawk ? <>Squawk: <b>{d.squawk}</b><br/></> : null }
                  { d.flight_number ? <>Flight Number: <b>{d.flight_number}</b><br/></> : null }
                  { d.flight_icao ? <>Flight ICAO/IATA: <b>{d.flight_icao}/{d.flight_iata}</b><br/></> : null }
                  { d.dep_icao ? <>Departure ICAO/IATA: <b>{d.dep_icao}/{d.dep_iata}</b><br/></> : null }
                  { d.airline_icao ? <>Arrival ICAO/IATA: <b>{d.arr_icao}/{d.arr_iata}</b><br/></> : null }
                  { d.airline_icao ? <>Airline ICAO/IATA: <b>{d.airline_icao}/{d.airline_iata} {airlineFlag(d.airline_iata)}</b><br/></> : null }
                  { d.aircraft_icao ? <>Aircraft ICAO: <b>{d.aircraft_icao}</b><br/></> : null }
                  { d.updated ? <>Updated: <b>{UTCtoIST(d.updated)}</b><br/></> : null }
                  { d.status ? <>Status: <b>{d.status}</b><br/></> : null }
                  { d.type ? <>Type: <b>{d.type}</b><hr/></> : null }
                  </div>
               ))}
            </div>
         }
      </div>
   )
}
 
export default DataRealtime