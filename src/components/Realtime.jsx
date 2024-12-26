import { useEffect, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import useFetch from './fetchHook/useFetch'
import DataRealtime from "./processData/DataRealtime"
import { AppContext } from '../context/AppContext'

const Realtime = () => {
   const { KEY, setGlobalData } = useContext(AppContext)
   const { id } = useParams()
   const [searchParams] = useSearchParams()

   const type = searchParams.get("type")
   const code = searchParams.get("code")
   const sort = searchParams.get("sort")

   let { error, loading, data } = useFetch(`https://airlabs.co/api/v9/flights?api_key=${KEY}&${type}${code}=${id}`)

   useEffect(() => {
      if(data)
         setGlobalData(data)
   }, [data, setGlobalData])

   return (
      <div className="Realtime">
         { error && <b className="error-text">{ error }</b> }
         { loading && <div id="msgBox"></div> }
         { data && <DataRealtime sort={sort} /> }
      </div>
   )
}
 
export default Realtime