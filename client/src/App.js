import React, {useContext, useState, useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import {observer} from 'mobx-react-lite'
import { Context } from './index'
import { check, getRole } from './http/userAPI'
import {Spinner} from 'react-bootstrap'
import SuccessRegistration from './components/modals/SuccessRegistration'
import Footer from './components/Footer'

const App = observer(() => {
  const {user, basket} = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    check().then(data => { 
        user.setUser(data)
        user.setGuest(localStorage.getItem('guest'))
        user.guest === 'false' ? user.setIsAuth(true) : user.setIsAuth(false)
    }).finally(() => setLoading(false))
  }, [])

  if(loading){
    return <Spinner animation={'grow'}></Spinner>
  }


  return (
    <BrowserRouter>
      <NavBar style={{fontFamily: "Roboto"}}></NavBar>
      <AppRouter style={{fontFamily: "Roboto", zIndex: "-1"}}></AppRouter>
    </BrowserRouter>
  )
})

export default App

