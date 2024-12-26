import React, { useEffect, useLayoutEffect, useRef, useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import M from "materialize-css"
import { handleEnter } from '../helper/Helper'
import "../../index.css"
import { AppContext } from '../../context/AppContext'

const OptionsRealtime = () => {
   const { inpRealtime, setInpRealtime } = useContext(AppContext)

   const navigate = useNavigate()
   const inpRef = useRef()
   const { id } = useParams()
   const location = useLocation()
   const [selectVal, setSelectVal] = useState({type:"airline",code:"_iata",sort:""})
   
   useEffect(() => {
      M.AutoInit()                          /* Auto initialize materialize css */
      document.title = "Flighty - Realtime"
   }, [])

   // Sync globalParams with URL params on load
   useLayoutEffect(() => {
      if(id) setInpRealtime(id)
      const searchParams = new URLSearchParams(location.search)
      const params = {}
      for (const [key, value] of searchParams.entries())
         params[key] = value
      setSelectVal(prev => ({ ...prev, ...params }))
   }, [location.search, id, setInpRealtime])

   const setParams = () => {
      const params = { ...selectVal }
      Object.keys(params).forEach(key => {
         if (!params[key])
            delete params[key]
      })
      
      return new URLSearchParams(params).toString()
   }

   const handleSortChange = e => {
      const newSort = e.target.value
      setSelectVal(prev => ({ ...prev, sort: newSort }))
      const updatedParams = { ...selectVal, sort: newSort }
      const paramsString = new URLSearchParams(updatedParams).toString()
      navigate(`/${inpRealtime}?${paramsString}`)
   }

   return (
      <div className="optionsRealtime option-tab options">
         <label>Select from:</label>
         <div className="option-options-1 ">
            <div className="">
               <select value={selectVal.type}
                  onChange={e => setSelectVal(preVal => ({...preVal, type: e.target.value}))}>
                  <option value="airline">Airline</option>
                  <option value="arr">Arrival</option>
                  <option value="dep">Departure</option>
               </select>
            </div>
            <div className="">
               <select value={selectVal.code}
                  onChange={e => setSelectVal(preVal => ({...preVal, code: e.target.value}))}>
                  <option value="_iata" className="left">IATA</option>
                  <option value="_icao" className="left">ICAO</option>
               </select>
            </div>
            <div className="">
               <select value={selectVal.sort}
                  onChange={handleSortChange}>
                  <option value="" disabled>--sort--</option>
                  <option value='flight_number_a'>Flight ↑</option>
                  <option value='flight_number_d'>Flight ↓</option>
               </select>
            </div>
         </div>
         <div className="option-options-2">
            <div className="input-field">
               <input placeholder="Enter query" id="inpRealtime" type="search"
                  value={inpRealtime || ""}
                  onKeyDown={e => handleEnter(e, inpRef.current)}
                  onChange={e => setInpRealtime(e.target.value?.toUpperCase())}
               />
            </div>
            <div className="input-field">
               <div className="btn-enter btn-small teal lighten-1"
                  ref={inpRef}
                  onClick={e => navigate(`/${inpRealtime}?${setParams()}`)}
               >Go
                  <i className="material-icons right">search</i>
               </div>
            </div>
         </div>
      </div>
   )
}
 
export default OptionsRealtime