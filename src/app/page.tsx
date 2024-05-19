'use client'

import { useState } from 'react';
import logo from '../../public/assets/B2BitLogo.png'
import { Nunito } from 'next/font/google';
import { axiosClient } from '@/services/baseService';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
    ErrorMessage
} from 'formik';
import schema from './schema';
import { useRouter } from 'next/navigation';

const nunito = Nunito({ weight: "700", subsets: ['latin'] })

interface LoginValues {
    email: string;
    password: string
}


export default function Home() {
    const router = useRouter()
    const [errorResponse, setErrorResponse] = useState('')

    const initialValues: LoginValues = {
        email: '',
        password: ''
    }

    async function handleSubmit(values: LoginValues) {
        await axiosClient.post('/auth/login/', values)
            .then(({status}) => {
                if (status === 200) {
                    router.push('/perfil')

                }
            }).catch(e =>{
                if (e.response.status === 401){
                    setErrorResponse(e.response.data.detail)
                } 
            })
    }

    return (
        <main className="flex h-screen flex-col items-center justify-center  bg-background" >
            

            <div className=" flex w-[438px] h-[534px] rounded-3xl shadow-[0_0px_60px_0px_rgba(0,0,0,0.3)] items-center justify-between flex-col bg-[#FFF] pt-10" >
                <img src={logo.src} alt="logo" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={(
                        values: LoginValues,
                        { setSubmitting }: FormikHelpers<LoginValues>
                    ) => {
                        handleSubmit(values)
                        setSubmitting(false)
                    }}
                >
                    {({ isValid }) => (
                        <Form className={`${nunito.className} flex flex-col size-11/12 py-5`}>
                            <span className="text-[#d00]" >{errorResponse}</span>
                            <div className="flex flex-col m-3">
                                <label htmlFor="email">E-mail</label>
                                <Field className="rounded-lg bg-[#F1F1F1] p-4" type="email" name="email" id="email" placeholder="@gmail.com" />
                                <ErrorMessage name="email" render={msg => <span  className="text-[#d00]"  >{msg}</span>}/>
                            </div>
                            <div className="flex flex-col m-3">
                                <label htmlFor="password">Password</label>
                                <Field className="rounded-lg bg-[#F1F1F1] p-4" type="password" name="password" id="password" placeholder="***********" />
                                <ErrorMessage name="password" render={msg => <span className="text-[#d00]"  >{msg}</span>} />
                            </div>
                            <button 
                                type="submit" 
                                className={`${isValid? "bg-azul": "bg-[#555]" } "text- text-[#FFF] m-3 p-4 rounded-lg`} 
                                disabled={!isValid}
                            >
                                Sign In
                            </button>
                        </Form>
                    )}
                    {/* ------------------------------------------------- */}
                    {/*<Form className={nunito.className + " flex flex-col size-11/12 py-5"} >
                        <div className='flex flex-col m-3'>
                            <label htmlFor="email">E-mail</label>
                            <Field className='rounded-lg bg-[#F1F1F1] p-4' type="email" name="email" id="email" placeholder='@gmail.com' />
                            <ErrorMessage name='email' />
                        </div>
                        <div className='flex flex-col m-3'>
                            <label htmlFor="password">Password</label>
                            <Field className='rounded-lg bg-[#F1F1F1] p-4' type="password" name="password" id="password" placeholder='***********' />
                            <ErrorMessage name='password' />
                        </div>
                        <button type='submit' className='bg-azul text-[#FFF] m-3 p-4 rounded-lg' >Sign In</button>
                    </Form>*/}
                </Formik>
            </div>

        </main>
    );
}
