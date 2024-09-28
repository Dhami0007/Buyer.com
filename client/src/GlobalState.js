import { createContext } from 'react'
import { useState, useEffect } from 'react'
import ProductAPI from './api/ProductAPI'
import axios from 'axios'
import UserAPI from './api/UserAPI'
export const GlobalState = createContext()


export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(null)
    const refreshToken = async() =>{
        const res = await axios.post('/user/refresh_token')
        setToken(res.data.accessToken)
    }

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin){
            refreshToken()
        } 
    },[])

    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token)
    }

    ProductAPI()

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}