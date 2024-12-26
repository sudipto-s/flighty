import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from "./context/AppContext"
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <AppProvider>
         <App />
      </AppProvider>
   </StrictMode>
)