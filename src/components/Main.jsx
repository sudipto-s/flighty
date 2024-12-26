import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import OptionsRealtime from './options/OptionsRealtime'
import OptionsInformation from './options/OptionsInformation'
import NotFound from './NotFound'
import Realtime from "./Realtime"
import Information from './Information'
import { AppContext } from '../context/AppContext'
import "../index.css"

const Main = () => {
   const { globalRef } = useContext(AppContext)

   return (
      <div className="Main" ref={globalRef}>
         <div className='container'>
            <Routes>
               <Route path="/"
                  element={
                     <>
                        <OptionsRealtime />
                        <Home option={"realtime"} />
                     </>
                  }
               />
               <Route path="info"
                  element={
                     <>
                        <OptionsInformation />
                        <Home option={"information"} />
                     </>
                  }
               />
               <Route path="/:id"
                  element={
                     <>
                        <OptionsRealtime />
                        <Realtime />
                     </>
                  }
               />
               <Route path="/info/:id"
                  element={
                     <>
                        <OptionsInformation />
                        <Information />
                     </>
                  }
               />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </div>
   )
}

export default Main