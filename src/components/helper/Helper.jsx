import React from 'react'
import { Country } from '../../assets/env'

/* Returns country name from a country code */
export const countryName = code => Country[code]

/* Returns an image of country flag */
export const countryFlag = flag => {
   flag = flag === "UK" ? "gb" : flag
   return <img alt="(Country flag)" src={`https://flagcdn.com/24x18/${flag?.toLowerCase()}.png`} />
}

/* Return an image of airline logo */
export const airlineFlag = logo =>
   <div id="logo-div"><img alt="(Airline flag)" src={`https://airlabs.co/img/airline/m/${logo}.png`} id='logo' /></div>

/* Converts UTC to IST & returns it */
export const UTCtoIST = t => {
   let vr = typeof t === 'string' ? new Date(t + 'Z') : new Date(t * 1000)
   return vr.toLocaleString().replace(':00', '')
}

/* Returns a string in xDays,xHours,xMinutes format */
export const Interval = t => {
   let day =  Math.floor(t/24/60),
      hour = Math.floor(t/60%24),
      min = Math.floor(t%60),
      str = ''
   if(day)
      str = day+' day(s), '
   if(hour)
      str += hour+' hour(s), '
   if(min)
      str += min+' min(s)'
   return str
}

/* Sorts flights by flight number in ascending/descending order */
export const sortFlight = (term, data) => {
   if(term)
      if(term?.includes('_a'))
         data?.sort((a, b) =>
            a[term.slice(0,-2)] - b[term.slice(0,-2)]
         )
      else if(term?.includes('_d'))
         data?.sort((a, b) =>
            b[term.slice(0,-2)] - a[term.slice(0,-2)]
         )
   return data
}

/* Handles click event for `enter` */
export const handleEnter = (e, target) => {
   if (e.key === 'Enter') {
      if(!e.target.value?.trim()) {
         alert("Enter data to continue..")
         return
      }
      e.preventDefault()
      e.target.blur()
      target.click()
   }
}

/* Sets the title & favicon of a page */
export const setHeaderNFavicon = title => {
   const link = document.querySelector("link[rel~='icon']"),
      iconUrl = "../../assets/icon1.png"
   if (title)
      document.title = title
   if (!link) {
      const newLink = document.createElement('link')
      newLink.rel = 'icon'
      newLink.href = iconUrl
      document.head.appendChild(newLink)
   } else
      link.href = iconUrl
}

export const mapZoolLvl = z => {
   const c = 4200
   if (!z) return 13 // Landed or altitude not available

   z *= 3.28 // Convert to feet

   if (z < c) return 12
   if (z < c * 2) return 11
   if (z < c * 3) return 10
   if (z < c * 4) return 9
   if (z < c * 5) return 8
   if (z < c * 6) return 7
   if (z < c * 7) return 6
   if (z < c * 8) return 5
   return 4
}

export const getTimeZoneName = () => {
   const date = new Date()
   const options = { timeZoneName: 'short' }
   const formatter = new Intl.DateTimeFormat('en-US', options)
   const parts = formatter.formatToParts(date)
   const timeZoneAbbr = parts.find(part => part.type === 'timeZoneName').value
   return timeZoneAbbr
}
