'use client'
import axios from "axios";


export const axiosClient = axios.create({
    baseURL: "https://api.homologation.cliqdrive.com.br"
})

axiosClient.interceptors.request.use(
    config => {
        config.headers.Accept = 'application/json;version=v1_web'
        const token = localStorage.getItem('access')
        if (token){
            config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
        }
        return config
    }, error => Promise.reject(error)
)

axiosClient.interceptors.response.use(
    response => {
        if (response.data.tokens) {
            localStorage.setItem('access', response.data.tokens.access)
            localStorage.setItem('refresh', response.data.tokens.refresh)
        }
        return response
    }, 
    error => {
        if (error.response.status === 401){
            if (error.response.data.code === 'token_not_valid'){
                const refreshToken = localStorage.getItem('refresh')
                
                axiosClient.post('auth/refresh/', {refresh: refreshToken})
                    .then(res =>{
                        const { access } = res.data.tokens
                        localStorage.setItem('access', access)
                        
                    })
            }
        }
            
        return Promise.reject(error)
    }
)   