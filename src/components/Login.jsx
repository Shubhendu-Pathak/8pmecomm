import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/CreateContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({
    useremail: "prasun@gmail.com",
    userpassword: "undertaker",
  });

  let navigate = useNavigate()

  let handlechange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

// auth
let auth = useAuth()


  useEffect(() => {
    document.title = "Ecommerce Login";
  }, []);

  // sucess alert toastify
  const notifysuccess = () =>
    toast.success("🦄 Login is Succesfully DONE!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // unsucess alert toastify
  const notifyunsuccess = () =>
    toast.error("🦄 Login is UNSuccess!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  // onLoginCLICK
  let onLoginClick = async () => {
    let response = await fetch(
      ` http://localhost:4000/users?email=${loginData.useremail}&password=${loginData.userpassword}`,
      { method: "GET" }
    );
    if (response.ok) {
      let responseBody = await response.json()
      // console.log(responseBody);
      if(responseBody.length>0){
        setTimeout(() => {
          navigate('/store')
        }, 5000);
        auth.setConData(
          {...auth.condata,
            isLoggedIn:true,
            currentUserName:responseBody[0]?.fullname,
            currentUserId:responseBody[0]?.id,
            currentUserRole:responseBody[0]?.role
          }
        )
        notifysuccess()
      }else{
        notifyunsuccess()
      }
    } else {
      notifyunsuccess();
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-5 col-md-7 mx-auto">
          <div className="card border-success shadow-lg my-2">
            <div className="card-header border-bottom border-success">
              <h3 style={{ fontSize: 30 }} className="text-primary">
                LOGIN
              </h3>
            </div>
            <div className="card-body border-bottom border-success">
              {/* email */}
              <div className="form-group mb-3">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="useremail"
                  value={loginData.useremail}
                  onChange={handlechange}
                  id="email"
                  className="form-control"
                  placeholder="EMAIL..."
                />
              </div>
              {/* password */}
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input
                  type="text"
                  name="userpassword"
                  value={loginData.userpassword}
                  onChange={handlechange}
                  id="pasword"
                  className="form-control"
                  placeholder="Password..."
                />
              </div>
            </div>
            {/* cardfotter */}
            <div className="card-footer">
              <button
                onClick={onLoginClick}
                className="btn btn-outline-info d-block w-100"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
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

export default Login;
