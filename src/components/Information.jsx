import { useEffect, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import useFetch from './fetchHook/useFetch'
import DataInformation from './processData/DataInformation'
import { AppContext } from '../context/AppContext'

const Information = () => {
   const { KEY, setGlobalData } = useContext(AppContext)
   const { id } = useParams()
   const [searchParams] = useSearchParams()

   const code = searchParams.get("code")

   let { error, loading, data } = useFetch(`https://airlabs.co/api/v9/flight?api_key=${KEY}&${code}=${id}`)

   useEffect(() => {
      if(data)
         setGlobalData(data)
   }, [data, setGlobalData])

   return (
      <div className="Information">
         { error && <b className="error-text">{ error }</b> }
         { loading && <div id="msgBox"></div> }
         { data && <DataInformation /> }
      </div>
   )
}

export default Information