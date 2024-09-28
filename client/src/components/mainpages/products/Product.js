import React from 'react'
import { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/productList/ProductList'
import '../../../index.css'

const Product = () => {
  const state = useContext(GlobalState)
  const [products] = state.productAPI.products
  const [isAdmin] = state.userAPI.isAdmin

  return (
    <div id="products" className="flex flex-row flex-wrap">
      {products.map(product => {
        return (
          <ProductList key={product._id} product={product} isAdmin={isAdmin}/>
        )
      })
      }
    </div>
  )
}

export default Product