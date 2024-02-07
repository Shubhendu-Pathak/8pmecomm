import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/CreateContext";


function Register() {
  let [state, setState] = useState({
    email: "",
    password: "",
    fullname: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    recievenewsletters: "",
  });
// navigate to dashboard
let navigate = useNavigate()

// usecontext
let auth = useAuth()
console.log(auth);


// console.log(state);

  let [countries, setCountries] = useState([
    { id: 1, countryname: "Laos" },
    { id: 2, countryname: "India" },
    { id: 3, countryname: "Nepal" },
    { id: 4, countryname: "Scotland" },
    { id: 5, countryname: "Iceland" },
    { id: 6, countryname: "Mexico" },
    { id: 7, countryname: "Lebanon" },
    { id: 8, countryname: "Russia" },
  ]);

  let handlechange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  let handlechecked = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    document.title = "Ecommerce Register";
  }, []);

// sucess alert toastify
const notifysuccess = () => toast.success('🦄 Registration is Succesfully DONE!', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  });;
// unsucess alert toastify
const notifyunsuccess = () => toast.error('🦄 Registration is UNSuccess!', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  });;


  // onRegisterClick

  let onRegisterClick = async()=>{

let response = await fetch('http://localhost:4000/users',{
  method:'POST',
  body:JSON.stringify(state),
  headers:{
    "Content-type":"application/json"
  }
})

if(response.ok){
  // alert('Registeration is Successfull')

let responseBody = await response.json()

  auth.setConData(
    {...auth.condata,
      isLoggedIn:true,
        currentUserName:responseBody?.fullname,
        currentUserId:responseBody?.id,
        currentUserRole:responseBody?.role
    }
  )
  notifysuccess()
  setTimeout(() => {
    navigate('/store')
  }, 5000);
}else{
  // alert('Register Unsuccessfull')
  notifyunsuccess()
}

  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mx-auto ">
          <h3>Register</h3>
          {/* email starts */}
          <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1">
              Email
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="UserEmail"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name='email'
              value={state.email}
              onChange={handlechange}
            />
          </div>
          {/* email ends */}

          {/* password starts */}
          <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1">
              Password
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              aria-label="Username"
              name='password'
              aria-describedby="basic-addon1"
              value={state.password}
              onChange={handlechange}
            />
          </div>

          {/* pass ends */}
          {/* fullname starts */}
          <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1">
              UserName
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="fullname"
              value={state.fullname}
              onChange={handlechange}
            />
          </div>

          {/* fulname ends */}
          {/* dob starts */}
          <div class="input-group my-3">
            <span class="input-group-text" id="basic-addon1">
              Date of Birth
            </span>
            <input
              type="date"
              class="form-control"
              placeholder="User D.O.B"
             
              name="dateOfBirth"
              value={state.dateOfBirth}
              onChange={handlechange}
            />
          </div>
          {/* dob ends */}

          {/* gender starts */}
          <div class="input-group my-3">
            <label htmlFor="" className="input-group-text">
              Gender
            </label>

            <div class="form-check mt-2 ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault1"
                value="male"
                checked={state.gender === "male" ? true : false}
                onChange={handlechange}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Male
              </label>
            </div>

            <div class="form-check mt-2 ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault1"
                value="female"
                checked={state.gender === "female" ? true : false}
                onChange={handlechange}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                FeMale
              </label>
            </div>
          </div>
          {/* gender ends */}
          {/* country stats */}
          <div class="my-3 d-flex justify-content-between">
            <span class="input-group-text py-1" id="basic-addon1">
              Country
            </span>
            <select
              name="country"
              class="form-select form-select-lg mb-1  w-75 "
              aria-label="Large select example"
              value={state.country}
              onChange={handlechange}
            >
              <option selected>Open this select menu</option>
              {countries.map((country) => {
                return (
                  <>
                    <option key={country.id} value={country.countryname}>
                      {country.countryname}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          {/* country ends */}
          {/* recieve new letter start */}
          <div class="form-check  d-flex justify-content-center gap-4 fs-3">
            <input
              class="form-check-input"
              type="checkbox"
              name="recievenewsletters"
              value={state.recievenewsletters}
              onChange={handlechecked}
              checked={state.recievenewsletters === true ? true : false}
              id=""
            />
            <label class="form-check-label" for="">
              Recieve News Letter
            </label>
          </div>
          {/* recieve new letter ends */}
        </div>
      </div>
      {/* register button */}
      <button 
      onClick={()=>{
        onRegisterClick()
        
      }}
       className="btn btn-success w-50 d-block mx-auto fs-2 mt-4"
       >Register</button>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  );
}

export default Register;
