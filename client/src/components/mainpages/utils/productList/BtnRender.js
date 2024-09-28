import React from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import '../../../../index.css'
import { useContext } from 'react'

const BtnRender = (product) => {
    const state = useContext(GlobalState)
  const [products] = state.productAPI.products
  const [isAdmin] = state.userAPI.isAdmin
  const addCart = state.userAPI.addCart
  product = product.product

  return (
    <div id="row_btn" className="flex flex-row justify-between w-56 my-3">
        {
          isAdmin ?
          <>  
        <Link id="btn_buy" to="#!" className="bg-blue-300 px-3 py-1 rounded-lg shadow-sm shadow-slate-400">Delete</Link>
        <Link id="btn_view" to={`/detail/${product._id}`} className="bg-blue-300 px-3 py-1 rounded-lg shadow-sm shadow-slate-400">Edit</Link></>:
        <>
        <Link id="btn_buy" to="#!" className="bg-blue-300 px-3 py-1 rounded-lg shadow-sm shadow-slate-400" onClick={() => addCart(product)}>Buy Now</Link>
        <Link id="btn_view" to={`/detail/${product._id}`} className="bg-blue-300 px-3 py-1 rounded-lg shadow-sm shadow-slate-400">View Now</Link></>  
        }
      </div>
  )
}

export default BtnRender