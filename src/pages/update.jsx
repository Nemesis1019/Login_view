import React, { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom';
import { toast } from "react-hot-toast"

export function update(){
  const { identification } = useParams();
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [party, setParty] = useState('');
  const [county, setCounty] = useState('');
  const [vote, setVote] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('formularioData');
    if (storedData) {
      const datos=JSON.parse(storedData);
      const index=datos.findIndex(datos=>datos.id===identification)
      if(datos){
        setName(datos[index].name)
        setYear(datos[index].year)
        setParty(datos[index].party)
        setCounty(datos[index].county)
        setVote(datos[index].vote)
        setEmail(datos[index].email)
        setId(datos[index].id)

      }
  }
  }, []);
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(name==="" || email==="" || id==="" || year==="" ||vote==="" ||party===""||county===""){
      toast.error("Faltan campos por llenar")
    }
    else if(!emailRegex.test(email)) {
      toast.error('Ingrese un dirección de correo valida');
      
    }
    else{
    const storedData = localStorage.getItem('formularioData');
    const datosO=JSON.parse(storedData);
    const index=datosO.findIndex(datos=>datos.id===identification)
    datosO[index].name=name
    datosO[index].id=id
    datosO[index].year=year
    datosO[index].email=email
    datosO[index].vote=vote
    datosO[index].party=party
    datosO[index].county=county
    
    localStorage.setItem('formularioData', JSON.stringify(datosO));
    toast.success("Updated")
    navigate("/table")
    
    }
  };
  return(
    <div className="flex justify-center items-center h-screen bg-blue-300  w-full ">
      <div className="bg-gray-200 w-5/6 h-3/4 rounded-3xl space-y-4 shadow-outline overflow-x-auto">
        
        <div className="flex justify-end mt-2 mr-2">
          <button className="btn whitespace-nowrap overflow-hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-110 rounded "  onClick={()=>navigate("/table")}>Back</button>
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 overflow-x-auto">
          <input className="hover:scale-110  h-8 w-3/6" type='text' value={name} placeholder='Name' onChange={e => setName(e.target.value)} maxLength={30} />
          <input className="hover:scale-110  h-8 w-3/6" type='number' value={id} placeholder='Id_number' onChange={e => setId(e.target.value)} />
          <input className="hover:scale-110  h-8 w-3/6" type='email' value={email}placeholder='Email' onChange={e => setEmail(e.target.value)}  />
          <input  className="hover:scale-110  h-8 w-3/6" type='number' value={year} placeholder='Year' onChange={e => setYear(e.target.value)} />
          <input className="hover:scale-110  h-8 w-3/6" type='text' value={party} placeholder='Political party' onChange={e => setParty(e.target.value)}  />
          <input  className="hover:scale-110 h-8 w-3/6"type='text' value={county} placeholder='County'  onChange={e => setCounty(e.target.value)} />
          <input  className=" hover:scale-110 h-8 w-3/6 " type='number' value={vote} placeholder='Vote count' onChange={e => setVote(e.target.value)}  />
          <button className=" btn whitespace-nowrap overflow-hidden w-3/6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-110 rounded  mt-2" onClick={handleSubmit} > Update</button>
        </div>
      </div>
    </div>
    )
}