import React from 'react'
import { Link } from "react-router-dom"

const NotFound = () => {
   document.title = "404 - Page Not Found"
   return (
      <div className="NotFound">
         <div className="notfound-container">
            <h1>404</h1>
            <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <div className="svg-container">
                  <svg viewBox="0 0 100 100" className="rocket-svg">
                     <g id="rocket">
                        <rect x="45" y="30" width="10" height="40" fill="#333"></rect>
                        <polygon points="40,30 50,10 60,30" fill="#333"></polygon>
                        <circle cx="50" cy="40" r="5" fill="#fff"></circle>
                     </g>
                     <g id="smoke">
                        <circle cx="50" cy="80" r="5" fill="#bbb"></circle>
                        <circle cx="50" cy="90" r="3" fill="#ccc"></circle>
                     </g>
                  </svg>
            </div>
            <Link to="/" className="home-btn">Go Home</Link>
         </div>
      </div>
   )
}
 
export default NotFound