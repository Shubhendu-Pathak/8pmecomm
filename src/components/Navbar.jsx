import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/CreateContext'

function Navbar() {
let auth = useAuth()


function onlogout(){
  auth.setConData(null)
}

  return (
    <div>

<nav className="navbar navbar-expand-sm bg-body-tertiary mynav position-fixed top-0">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">  
    <i className="fa-solid fa-cart-plus text-danger"></i>
    Ecommerce</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mt-1 navitems">
     

     {
      auth.condata?.isLoggedIn===true ? '' : 
      <li className="nav-item">
      <NavLink className="nav-link" aria-current="page" to="/">Login</NavLink>
    </li>
     }

      {
        auth.condata?.isLoggedIn === true ? '' :
        <li className="nav-item">
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </li>
      }

{
    auth.condata===null ||  auth.condata?.isLoggedIn===false ? '' : 
      <li className="nav-item">
        <NavLink className="nav-link " aria-current="page" to="/store"> Store</NavLink>
    </li>
     }
     

{
    auth.condata===null ||  auth.condata?.isLoggedIn===false ? '' : 
      <li className="nav-item">
        <NavLink className="nav-link " aria-current="page" to="/dashboard"> Dashboard</NavLink>
    </li>
     }
     
     {
    auth.condata===null || auth.condata.currentUserRole===null || auth.condata.currentUserRole==='user' || auth.condata?.isLoggedIn===false ? '' : 
      <li className="nav-item">
        <NavLink className="nav-link " aria-current="page" to="/admin"> Admin</NavLink>
    </li>
     }
     


{
 auth.condata===null || auth.condata?.isLoggedIn===false ? '':
  <div style={{marginLeft:'70%'}}>
  <li className="nav-item dropdown">
    <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i className="fa-regular fa-user"></i>{"  "}  
    {auth.condata?.currentUserName}
    </NavLink>
    <ul className="dropdown-menu ">
      <li className='w-50 m-auto'>
        <button 
        onClick={onlogout}
         className="btn btn-danger">Logout</button>
        </li>
    </ul>
  </li>
  </div>
}
      
      </ul>
    
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar