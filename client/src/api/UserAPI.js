import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        console.log("token", token)
        if(token){
            const getUser = async() => {
                try{
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    console.log("res", res)
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                }
                catch(err){
                    alert(err.response.data.msg)

                }
            }
            getUser()
        }
    }, [token])

    const addCart = async (product) => {
        if (!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])
        }
        else{
            alert("This product has already been added to the cart.")
        }
    }
    
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addCart: addCart,
    cart: [cart, setCart]
  }
}

export default UserAPI