import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../common'

const SearchProduct = () => {



    const query = useLocation()

    console.log("query",query.search)


    
    const fetchProduct = async()=>{
        // setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
        console.log("dataresponse", dataResponse)
        // setLoading(false)

        // setData(dataResponse.data)
    }


    useEffect(()=>{
        fetchProduct()
    },[query])

  return (
    <div>
        SearchProduct
        </div>
  )
}

export default SearchProduct