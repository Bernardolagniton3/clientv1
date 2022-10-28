import { Route, Routes } from 'react-router-dom' 
import Home from './components/Home'
import LoginMain from './components/user/LoginMain'
import Profile from './components/user/Profile'  
import LoginOtpEnter from './components/user/LoginOtpEnter'
import CardName from './components/user/CardName'
import Report from './components/reports/Report'
import { APIContextProvider } from './components/reports/Apicontext'


function App() {
  return (
    <>
     <APIContextProvider>
      
      
      <Routes> 
      <Route path="/home" element={<Home/>}/>
       <Route path="/" element={<LoginMain/>}/>  
      <Route path="/profile" element={<Profile/>}/>  
      <Route path="/LoginOtpEnter" element={<LoginOtpEnter/>}/>   
      <Route path="/CardName" element={<CardName/>}/> 
      <Route path="/report" element={<Report/>}/> 
     </Routes>
     
      
    </APIContextProvider>
    </>
  );
}

export default App;
