import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'
import '../../../../index.css'

const DetailProduct = () => {

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    const [image, setImage] = useState("")

    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id){
                    setDetailProduct(product)
                    setImage(product.images.originalname)
                }
                })
        }
    },[params, products])

  return (
    <div id="detail" className="flex flex-col place-items-center">
        <img src={"http://localhost:5000/api/uploads/"+image} alt="" className="rounded-lg p-5"/>
        <div id="box-detail" className="p-5">
            <div id="row" className="w-max px-5 py-1 rounded-lg shadow-sm shadow-blue-400 ">
                <h2>#id: {detailProduct.product_id} {detailProduct.title}</h2>
            </div>
            <div className="w-max px-5 py-4 rounded-lg shadow-sm shadow-blue-400 mt-3 h-max">
            <span>$ {detailProduct.price}</span>
            <p>{detailProduct.description}</p>
            <p>{detailProduct.content}</p>
            <p className="mb-4">Sold: {detailProduct.sold}</p>
            <Link to = "/cart" className="px-4 py-2 bg-blue-600 hover:bg-blue-800 transition-all text-white rounded-lg">Buy Now</Link>
            </div>
            
        </div>
    </div>
  )
}

export default DetailProduct