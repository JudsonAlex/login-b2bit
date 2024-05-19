import { useState } from 'react';
import logo from '../../public/assets/B2BitLogo.png'
import { Nunito } from 'next/font/google';

const nunito = Nunito({ weight: "700", subsets: ['latin'] })

export function FormWithoutFormik(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return(
        <div className=" flex w-[438px] h-[534px] rounded-3xl shadow-[0_0px_60px_0px_rgba(0,0,0,0.3)] items-center justify-between flex-col bg-[#FFF] pt-10">
                <img src={logo.src} alt="logo" />
                <form className={nunito.className + " flex flex-col size-11/12 py-5"} onSubmit={e => e.target}>
                    <div className='flex flex-col m-3'>
                        <label htmlFor="email">E-mail</label>
                        <input onChange={e => setEmail(e.target.value)} className='rounded-lg bg-[#F1F1F1] p-4' type="email" name="" id="email" placeholder='@gmail.com' />
                    </div>
                    <div className='flex flex-col m-3'>
                        <label htmlFor="password">Password</label>
                        <input onChange={e => setPassword(e.target.value)} className='rounded-lg bg-[#F1F1F1] p-4' type="password" name="" id="password" placeholder='***********' />
                    </div>
                    <button className='bg-azul text-[#FFF] m-3 p-4 rounded-lg' >Sign In</button>
                </form>


            </div>
    )
}