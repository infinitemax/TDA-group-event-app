"use client"
import {ApiClient} from '@/apiClient'
import { useState } from 'react'

const Login = () => {
    const apiClient = new ApiClient()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  return (
    <div className='w-96 mx-auto shadow-md rounded-lg p-8 flex justify-center mt-20 bg-slate-100'>
        <form className='flex flex-col'
            onSubmit={(e) => {
                e.preventDefault()
                apiClient.login(email, password)
                .then((res) => {
                    console.log(res)
                    if (res.status === 200 && res.data?.token) {
                        window.localStorage.setItem('token', res.data.token)
                        window.location.href ="/"
                    }
                })
            } }
        >
            <input className="border-2 rounded-md w-56 my-4 px-2" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input className="border-2 rounded-md w-56 my-4 px-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-blue-400 rounded-md w-20 text-white" type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login