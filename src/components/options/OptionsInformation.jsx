import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import M from "materialize-css"
import { handleEnter } from '../helper/Helper'
import "../../index.css"
import { AppContext } from '../../context/AppContext'

const OptionsInformation = () => {
   const { inpInformation, setInpInformation } = useContext(AppContext)

   const inpRef = useRef()
   const { id } = useParams()
   const navigate = useNavigate()
   const location = useLocation()
   const [selectVal, setSelectVal] = useState("flight_iata")
   
   useEffect(() => {
      M.AutoInit()                             /* Auto initialize materialize css */
      document.title = "Flighty - Information"
   }, [])

   useLayoutEffect(() => {
      if(id) setInpInformation(id)
      const searchParams = new URLSearchParams(location.search)
      let type = searchParams.get("type")
      if(type !== "flight_iata" || type !== "flight_icao")
         type = "flight_iata"
      setSelectVal(type)
   }, [id, setInpInformation, location.search])

   const setParams = () => {
      const params = {}
      if (selectVal) params.code = selectVal
      console.log(params)
      return new URLSearchParams(params).toString()
   }
   
   return (
      <div className="optionsInformation option-tab options">
         <label>Select from:</label>
         <div className="option-options-1">
            <div className="">
               <select value={selectVal || "flight_iata"}
                  onChange={e => setSelectVal(e.target.value)}>
                  <option value="flight_iata" className="left">Flight IATA</option>
                  <option value="flight_icao" className="left">Flight ICAO</option>
               </select>
            </div>
            <div className="input-field">
               <input placeholder="Enter query" id="inpInformation" type="search"
                  value={inpInformation || ""}
                  onKeyDown={e => handleEnter(e, inpRef.current)}
                  onChange={e => setInpInformation(e.target.value?.toUpperCase())}
               />
            </div>
            <div className="input-field">
               <div className="btn-enter btn-small teal lighten-1"
                  ref={inpRef}
                  onClick={e => navigate(`/info/${inpInformation}?${setParams()}`)}
               >Go
                  <i className="material-icons right">search</i>
               </div>
            </div>
         </div>
      </div>
   )
}

export default OptionsInformation