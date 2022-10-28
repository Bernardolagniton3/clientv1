import React, { Fragment, useState, useEffect  } from 'react'

import LoadingScreen from "react-loading-screen" 
import spinner from "../../images/svglogo.gif"

const LoginOtpEnter = () => {
    const [items, setAllItems] = useState([]);
    const [AllToken, setAllToken] = useState([]);
    const [ProfileNameOtp, setProfileNameOtp] = useState("");
    const [ValidOtp , setValidOtp] = useState(false)
    const [otp, setOtp] = useState('');  
    const [UserProfileSession, setUserProfileSession] = useState([]);
    const [BalanceSes, setBalanceSes]  = useState([]);
    const [validate, setValidate] = useState(false);
    const [OtpText, setOtpText] =  useState(true);

    const submitHandlerOtp = (e) => {
        e.preventDefault();   
          loginUser({
            otp,
             
        }).then(response => {
            if (response) {
                 
                sessionStorage.setItem('token', response['token']);
                 setAllToken(response['token']) 
                 setValidate(true)
                 setOtpText(false)
            } else {
                console.log(response['message'])
            }
        }).catch(error => {
            console.log("some error occurred", error);
            setValidOtp(true);
        });
    }
    console.log("profile", items)
 
    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('otp'));
        const phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));
            setAllItems(items);
            setProfileNameOtp(phoneNumber)
    }, [items]);
    
   //loading set
    useEffect(() =>{
        sessionStorage.setItem('profile', JSON.stringify(UserProfileSession));
        sessionStorage.setItem('balance', JSON.stringify(BalanceSes));
    },[UserProfileSession, BalanceSes])
    useEffect(() => { 
       
        const fetchQL =  () => {
        
            const query = `
               query($msisdn: String){
               user(msisdn: $msisdn), {
                 fullName
                 familyName
                 gender
                 title
                 birthDate
                 userName
                 userAccess
                 contactInfo{
                    phoneNumber
                    emailAddress
                  }
                  childNumbers
                
                 }
                 customerBalance(msisdn: $msisdn) {
                    msisdn
                    balances {
                      serviceType
                      totalRemaining
                      bundle {
                        name
                        remaining
                        expiryDate
                        expiryTime
                      }
                    }
                  }
               }
            
            `;
           fetch("http://localhost:8000/graphql/balancesManagement/serviceBalances",{
                
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization" :`Bearer ${AllToken}`,
            },
            body:JSON.stringify({
                query,
                variables: {
                    msisdn: `${ProfileNameOtp}`
                }
            })
    
        }).then(response => {
            return response.json();
            
        }).then(data => {
            setUserProfileSession(data.data.user);
            setBalanceSes(data.data.customerBalance);
            if(data){
                setTimeout(() => {
                    window.location.href = "/Profile";
                }, 1000); 
            }
        })
        }
        if (validate) {
            setTimeout(() => {
                setValidate(false);
                fetchQL();
            
            }, 3000);
        }
    }, [validate, ProfileNameOtp, AllToken]);  
      async function loginUser(credentials) {
        return fetch('http://localhost:8000/verify',
         {
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
                {validate && (  
                 <LoadingScreen 
                   loading={true}
                   bgColor="#f1f1f1"
                   spinnerColor="#676767"
                   logoSrc={spinner}
                  />
                 )}
                {OtpText ? (<div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandlerOtp} encType='multipart/form-data'>
                            <h1 className="mb-3 font30">Enter OTP</h1>
                        
                          <div className="form-group posRT20">
                                <input
                                  
                                    type="name"
                                    id="otp_field"
                                    className="form-control w200"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div> 
                       {ValidOtp ? (<><div className="row"><p className='redColor'>Please enter a valid OTP</p></div></>):""}
                         <div className="row"> 
                          <div className="col-4"> 
                          <button
                                id="register_button"
                                type="submit"
                                className="btn btn-block py-3">
                                Validate
                            </button> 
                            </div>
                            </div>
                        </form>
                  </div>
                  </div>):""}          
                </Fragment>
        </Fragment>
    )
}
export default LoginOtpEnter
