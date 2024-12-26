import { useState, useEffect } from 'react'
import axios from "axios"

const useFetch = url => {
   const [data, setData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
      const abortCont = new AbortController()
      setLoading(true)

      const fetchData = async() => {
         try {
            const { data: result } = await axios.get(url, { signal: abortCont.signal })
            setData(result)
            setLoading(false)
            setError(null)
         } catch (err) {
            console.log(err)
            if (err.name === 'AbortError') {
               console.log('fetch aborted')
            } else if (err.name === 'CanceledError') {
               console.log(err.code, err.message)
            } else {
               setData(null)
               setLoading(false)
               setError(err.message)
            }
         }
      }
      fetchData()

      return () => abortCont.abort()
   }, [url])

   return { data, loading, error }
}

export default useFetch