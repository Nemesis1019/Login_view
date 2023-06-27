import { useNavigate} from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { BsFillPencilFill } from 'react-icons/bs';
import {BsFillTrashFill} from 'react-icons/bs'

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export function table(){
    const navigate=useNavigate()
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem('formularioData');
        if (storedData) {
          setDatos(JSON.parse(storedData));
        }
      }, []);
    
    const handleDelete=(index)=>{
        const  res= window.confirm("Are you sure?")
        if(res){
            const updatedDatos = [...datos]; 
            updatedDatos.splice(index, 1);
            setDatos(updatedDatos);
            localStorage.setItem('formularioData', JSON.stringify(updatedDatos));
            toast.success("Deleted")
        }
        
  };
  return(
    <div className="flex flex-col justify-center items-center h-screen bg-blue-300 overflow-y-auto  ">
      <div className="bg-gray-200 w-5/6 h-3/4 rounded-3xl space-y-4 shadow-outline overflow-y-auto ">
        <div className="flex justify-end mt-2 mr-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-110 rounded" onClick={()=>navigate("/form")}>Back</button>
        </div>
        {datos.length==0 &&(
          <div className=" text-3xl text-center ">Aun no hay datos para mostrar</div>
        )}
        {datos.length>0 &&(
          <div className="flex justify-center items-center">
            <h1>Tabla de datos</h1>
          </div>
        )}
        {datos.length>0 &&(
          <div className="flex justify-center items-center  w-full  overflow-y-auto " >
            <Table className="  divide-y ml-4 mr-4 mb-4 w-5/6 ">
              
              <Thead>
                <Tr>
                  <Th className="border border-black">Name</Th>
                  <Th className="border border-black">Identification</Th>
                  <Th className="border border-black">Email</Th>
                  <Th className="border border-black">Year</Th>
                  <Th className="border border-black"> Political party</Th>
                  <Th className="border border-black">County</Th>
                  <Th className="border border-black">Vote count</Th>
                </Tr>
              </Thead>
              <Tbody>
                {datos.map((dato, index) => (
                  <Tr className="space-y-0.5 " key={index}>
                    <Td className="text-center border border-black">{dato.name}</Td>
                    <Td className="text-center border border-black">{dato.id}</Td>
                    <Td className="text-center border border-black">{dato.email}</Td>
                    <Td className="text-center border border-black">{dato.year}</Td>
                    <Td className="text-center border border-black">{dato.party}</Td>
                    <Td className="text-center border border-black">{dato.county}</Td>
                    <Td className="text-center border border-black">{dato.vote}</Td>
                    <div className="space-x-2 text-center">
                      <button key={index} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-110 rounded" onClick={()=>handleDelete(index)}> <BsFillTrashFill/>  </button>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 transition duration-300 transform hover:scale-110 rounded" onClick={()=>navigate(`/update/${dato.id}`)}><BsFillPencilFill/></button>
                    </div>
                    
                  </Tr> 
                ))}
              </Tbody>
            </Table> 
          </div>      
          )}     
        </div>  
      </div>      
  )
}