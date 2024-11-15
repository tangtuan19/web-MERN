import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const parmas = useParams()
    console.log("category", parmas)

  return (
    <div>
       {
        parmas?.categoryName
       }

    </div>
  )
}

export default CategoryProduct