import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({
    name:'',
    email: '',
    password:''
  })

  const onChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value})
  }

  const RegisterSubmit = async e => {
    e.preventDefault()
    try{
      await axios.post('/user/register', {...user})
      localStorage.setItem('firstLogin', true)

      window.location.href="/"
    }
    catch(err){
      alert(err.response.data.msg)
    }
  }

  return (
    <div>
      <form onSubmit={RegisterSubmit}>
        <input type="text" name="name" required placeholder='Name' value={user.name} onChange={onChangeInput}/>
        <input type="email" name="email" required placeholder='Email' value={user.email} onChange={onChangeInput}/>
        <input type="password" name="password" required placeholder='Password' value={user.password} onChange={onChangeInput}/>

        <div>
          <button type="submit">Register</button>
          <p>Already Signed up? <Link to="/register">Log In !</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register