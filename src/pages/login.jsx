import { useNavigate} from "react-router-dom"
import { useState } from 'react'
import { toast } from "react-hot-toast"


import myimage from "../assets/image.jpg"
import candado from "../assets/Candado.jpg"
import arroba from "../assets/arroba.jpg"
import React from 'react';

export function login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleLogin = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email==="" || password==="")
        {
            toast.error('Hay espacios sin llenar')
        }
        else if(!emailRegex.test(email)) {
            toast.error('Ingrese un dirección de correo valida');
            
        }
        else if(email === 'admin@gmail.com' && password === 'admin') {
      
            navigate("/form")
      
        } 
        else {

            toast.error('Credenciales incorrectas')
            setPassword("")
            setEmail("")
        }
    };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
        <div className="bg-gray-200 p-16 rounded-3xl " >
            <div className="flex flex-col justify-center items-center mb-4">
                <img className="w-20 h-20" src={myimage} alt="imagen.png" />
            </div>
            <div className="flex flex-col justify-center items-center space-y-4 ">
                <div className="flex w-full space-x-1">
                    <img className="w-full h-10 bg-cyan-500 object-cover rounded-l-2xl " src={arroba} alt="imagen.png" />
                    <input className="hover:scale-110 rounded-r-2xl " type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} maxLength={30} />
                </div>
                <div className="flex space-x-1">
                    <img className="w-12 h-10 object-cover rounded-l-2xl" src={candado} alt="imagen.png" />   
                    <input className="hover:scale-110 rounded-r-2xl " type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} maxLength={15}/>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-110 rounded" onClick={handleLogin}>Sign in</button>
             </div>
        </div>
    </div>
  );
}
