import React from 'react'
import { MdOutlineMenu } from "react-icons/md";
import '../../index.css'
import { MdClose } from 'react-icons/md';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

const Header = () => {

  const state = useContext(GlobalState)
  const [isLogged, setIsLogged] = state.userAPI.isLogged
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
  const [cart, setCart] = state.userAPI.cart

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)

  }

  const adminRouter = () => {
    return (
      <>
        <li><Link to="/create_product">Create Product</Link></li>
        <li><Link to="/category">Categories</Link></li>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
      </>
    )
  }

  return (
    <header className= "flex flex-row justify-around items-center p-5 font-mono">
        <div className="text-xl p-2 hidden"> 
          <MdOutlineMenu width={30}/>
        </div>
        <div className = "text-2xl font-semibold transition-all hover:text-blue-500">
              <Link to="/">{isAdmin ? 'Admin': 'MERN Shopping'}</Link>
        </div>

        <ul className="inline-flex">
          <li className="pr-10"><Link to="/">{isAdmin ? 'Products':'Shop'}</Link></li>
          {isAdmin ? adminRouter(): ''}
          {
            isLogged ? loggedRouter(): <li><Link to="/login">Login or Register</Link> </li>
          }
          <li className="pl-10"><Link to="/login">Login or Register</Link></li>

          <li className="hidden">

            <MdClose width={30}/>
          </li>
        </ul>

        {
          isAdmin ? '':
        <div id="cart-icon" className="flex flex-row items-center relative">
          <span className="px-2 rounded-full absolute bottom-5 left-7 font-semibold bg-red-600 text-white">{cart.length}</span>
          <Link to="/cart" className="text-3xl">
            <AiOutlineShoppingCart width={30}/>
          </Link>
        </div>
        }
    </header>
  )
}

export default Header