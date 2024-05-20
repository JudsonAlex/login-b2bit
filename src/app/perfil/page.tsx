'use client'
import { useRouter } from 'next/navigation'
import image from '../../../public/assets/B2BitLogo.png'
import { useEffect, useState } from 'react'
import { axiosClient } from '@/services/baseService'

export default function Perfil(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [counter, setCounter] = useState(3)
    
    const router = useRouter()


    function logout(){
        localStorage.clear()
        router.push('/')
    }

    useEffect(()=>{
        axiosClient.get('auth/profile/')
        .then( res =>{
            setName(res.data.name)
            setEmail(res.data.email)
            setImagePath(res.data.avatar.low)
            setIsAuthenticated(true)
        }).catch(e => {
            if (counter > 0) {
                const timerId = setTimeout(() => {
                  setCounter(counter - 1);
                }, 900);
          
                // Limpar o timeout se o componente for desmontado ou o count mudar
                return () => clearTimeout(timerId);
              }
            router.push('/')
        })
        
    }, [counter])

    return(
        isAuthenticated?
        <main className="flex h-screen flex-col items-center  bg-[#F1F5F9]" >
            <div className="flex h-20 w-full bg-[#FFF]  items-center justify-end">
                <button className="w-72 h-11 text-center text-[#FFF] rounded-md  bg-azul mr-10" onClick={() =>logout()}>
                    <span className="font-bold">Logout</span>
                </button>
            </div>

            <div className=" flex w-[356px] p-5 rounded-3xl shadow-lg items-center justify-between flex-col bg-[#FFF] mt-20" >
                <div className='flex flex-col justify-center items-center'>
                    <p>Profile picture</p>
                    <img src={imagePath} className='size-14 rounded-md m-2' alt="user image"/>
                </div>
                <div className='flex flex-col m-3 w-11/12' >
                    <p>Your <span className="font-bold">Name</span></p>
                    <input className='rounded-lg bg-[#F1F1F1] p-4' type="text" disabled value={name}/>
                </div>
                <div className='flex flex-col m-3 w-11/12' >
                    <p>Your <span className="font-bold" >Email</span></p>
                    <input className='rounded-lg bg-[#F1F1F1] p-4' type="text" disabled value={email}/>
                </div>
            </div>
        </main>:
        <div className="flex h-screen flex-col items-center justify-center bg-[#F1F5F9] text-[#e60202] text-2xl">Você não está logado. Redirecionando para o Login...{counter}</div>
    )
}