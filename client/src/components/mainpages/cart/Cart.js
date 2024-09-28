import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import '../../../index.css'
import { Link } from 'react-router-dom'


const Cart = () => {
  const state = useContext(GlobalState)
  const [cart] = state.userAPI.cart

  if (cart.length === 0){
    return <h2 className="text-3xl p-5 text-center font-bold font-mono">Cart Empty</h2>
  }

  return (
    <div>
      {cart.map(product => (
        <div id="detail" className="flex flex-row place-items-center justify-between mx-32 m-3 rounded-lg shadow-sm shadow-blue-600">
        <img src={"http://localhost:5000/api/uploads/"+product.images.originalname} alt="" className=" m-2 w-48 rounded-lg"/>
        <div id="box-detail" className="p-5 flex flex-row items-center">
            <div id="row" className="w-max px-5 py-1 rounded-lg h-max">
                <h2>#id: {product.product_id} {product.title}</h2>
            </div>
            <div className="w-max px-5 py-4 rounded-lg  mt-3 h-max">
            <span>$ {product.price}</span>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <p className="mb-4">Sold: {product.sold}</p>
            </div>
            <Link to = "/cart" className="px-4 py-2 bg-blue-600 hover:bg-blue-800 transition-all text-white rounded-lg">Buy Now</Link>
            
        </div>
    </div>
      )
      )}
    </div>
  )
}

export default Cart