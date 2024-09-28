import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password:''
  })

  const onChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value})
  }

  const loginSubmit = async e => {
    e.preventDefault()
    try{
      await axios.post('/user/login', {...user})
      localStorage.setItem('firstLogin', true)

      window.location.href="/"
    }
    catch(err){
      alert(err.response.data.msg)
    }
  }

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <input type="email" name="email" required placeholder='Email' value={user.email} onChange={onChangeInput}/>
        <input type="password" name="password" required placeholder='Password' value={user.password} onChange={onChangeInput}/>

        <div>
          <button type="submit">Login</button>
          <p>Have not Signed up yet? <Link to="/register">Register Here</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login