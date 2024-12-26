import { createContext, useRef, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
   const globalRef = useRef(null)
   const [globalData, setGlobalData] = useState(null)
   const [inpRealtime, setInpRealtime] = useState(null)
   const [inpInformation, setInpInformation] = useState(null)
   const [KEY] = useState(import.meta.env.VITE_AIR_DEV || import.meta.env.VITE_AIR_PROD)

   return (
      <AppContext.Provider value={
         { globalData, setGlobalData, globalRef, KEY,
            inpRealtime, setInpRealtime, inpInformation, setInpInformation
         }
      }>
         {children}
      </AppContext.Provider>
   )
}