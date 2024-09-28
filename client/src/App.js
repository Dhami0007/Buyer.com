import React from 'react'
import Header from './components/header/Header'
import Pages from './components/mainpages/Pages'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { DataProvider } from './GlobalState'

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="flex flex-col place-items-center">
          <div className="px-5 w-10/12 h-max shadow-md shadow-slate-400">
            <Header />
            <hr/>
            <Pages />
          </div>
        </div>
              
      </Router>
    </DataProvider>
    
  )
}

export default App