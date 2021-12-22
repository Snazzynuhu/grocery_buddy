import React,{useEffect} from 'react';
import './alert.css';
const Alert = ({type, message, closeAlert}) => {
   useEffect(()=>{
       const timeOut =  setTimeout(()=>{
        closeAlert();
    },2000);
    return ()=> clearTimeout(timeOut);
   },[])
    return (
        <div>
            <p className={ `alert ${type}`}>{message}</p>
        </div>
    )
}

export default Alert
