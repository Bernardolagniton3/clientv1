import React, { Fragment, useState} from 'react'
import { Link } from 'react-router-dom'
import * as Constants from "../layout/svg.js"
import "./profile.css"
import "./LoginMain.css"

const LoginMain = () => {
    const [userName, setUserName] = useState();
    const [numberTrue, setNumberTrue] = useState(true);
    const [password, setPassword] = useState();
    const [phoneNumber, setMs] = useState();
    const [ValidationError, setValidationError] = useState(false);
    const isNumber = (str) => {
    if (str.trim() === '') {
      return false;
    }
  
    return !isNaN(str);
  }
     

  const handleChange = event => {

      if (isNumber(event.target.value)) {
                setNumberTrue(true) 
                //setUsernameString(false)
                setMs(event.target.value);
            
            console.log('✅ It is a valid number');
        } else {
          console.log('⛔️ It is NOT a valid number');
                setNumberTrue(false) 
               // setUsernameString(true)
                setUserName(event.target.value);
        } 
  };  

  const submitHandler = async e => {
       e.preventDefault();
       loginUser({
        phoneNumber,
        password,
            }).then(response => {
                if (response) {
                    sessionStorage.setItem('otp', response['otp']);
                    localStorage.setItem('phoneNumber', phoneNumber);

                    window.location.href = "/LoginOtpEnter";

                } else {
                    console.log(response['message'])
                }
            }).catch(error => {
                console.log("some error occurred", error);
                setValidationError(true)
            });
          
        // {userNameString &&  loginUser({
        //     userName,
        //     password,    
        // }).then(response => {
        //     if (response) {
        //         localStorage.setItem('otp', response['otp']);
        //         window.location.href = "/LoginOtpEnter";
        //     } else {
        //         console.log(response['message'])
        //     }
        // }).catch(error => {
        //     console.log("some error occurred", error);
        // });}
  };


    async function loginUser(credentials) {
        return fetch('http://localhost:8000/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
           })
            .then(data => data.json())
    }

    return (
        <Fragment>
            <Fragment>
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg p-3 mb-5 bg-white rounded" onSubmit={submitHandler}>
                         <div className='row'>
                          <div className="logo marCenter">
                            <Link to={`${process.env.PUBLIC_URL}/`}>{Constants.logo}</Link>
                          </div>
                         </div>
                            <h1 className="mb-3">Login</h1>
                            <div className="form-group">
                                <label className="labelspan" htmlFor="email_field">Cell Number/Username</label>
                                {numberTrue ? ( 
                                <>
                               <div className='row'>
                               <div className='col-md-2'>
                               <input
                                    type="text"
                                    id="areacode"
                                    className="form-control w70"
                                    value={"(082)"}
                                />
                                </div>
                                <div className='col-md-10'>
                                <input
                                    type="text"
                                    id="email_field"
                                    className="form-control"
                                    value={phoneNumber}
                                    //onChange={(e)=> handleChange(idMask(e))}
                                    onChange={(e)=> handleChange((e))}
                                />
                                </div>
                                 </div>   
                                </>):<input
                                    type="text"
                                    id="email_field"
                                    className="form-control"
                                    value={userName}
                                    onChange={handleChange}
                                />
                               }
                            </div>
                            <div className="form-group">
                                <label className="labelspan" htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {ValidationError ? (<><div className='row'><p className='redColor'>Please enter a valid Username and Password</p></div></>) : "" }
                            <div className='row'>
                                <div className="col-12">
                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3 btndesign"
                                    >
                                        <span className='fa fa-sign-in marLR'></span>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        </Fragment>
    )
}

export default LoginMain
