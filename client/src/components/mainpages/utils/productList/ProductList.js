import React from 'react'
import { Link } from 'react-router-dom'
import '../../../../index.css'
import { useContext } from 'react'
import { GlobalState } from '../../../../GlobalState'
import BtnRender from './BtnRender'

const ProductList = ({product, isAdmin}) => {

  return (
    <div id="product_card" className="flex flex-col border-2 w-max px-4 rounded-lg m-4 place-items-center pt-4">
      {isAdmin && <input type="checkbox" checked={product.checked} />}
        <img src={"http://localhost:5000/api/uploads/" + product.images.originalname} alt='' className="w-56"/>
        <div id="product_box" className="p-2 w-56">
          <h2 title={product.title} className="font-bold">{product.title}</h2>
          <span>${product.price}</span>
          <p>{product.description}</p>
        </div>
        <span>{product.product_id}</span>
      
      <BtnRender product={product}/>
    </div>

    
  )
}

export default ProductList