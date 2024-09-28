import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const ProductAPI = () => {
  
    const [products, setProducts] = useState([])
    const getProducts = async() => {
        const res = await axios.get('/api/products')
        setProducts(res.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return {
    products: [products, setProducts]
    }
}

export default ProductAPI