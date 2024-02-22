"use client"
import postHandler from "@/handlers/postHandler";
import { useState,useEffect } from "react";
import Image from "next/image";
import { FormEvent } from 'react'
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
export default function Login(){
const [username,setUsername]=useState<string>("")
const [password,setPassword]=useState<string>("")
const router =useRouter();
async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if(username==="" || password===""){
            toast.error('Username and password cannot be empty');
             return;
        }
        const data={
            username:username,
            password:password
        }
        const response = await postHandler(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/auth/login`,data)
        if(response.status===1){
            toast.success('Registered')
            console.log(response)
            Cookies.set('token',response.data.token)
            router.push('/')
        }
        else{
            if(response.status===0)
            toast.error(`${response.data.error}`)
            else{
                toast.error('Unable, -1 code')
            }
        }
        
      }

    
    return (
        <>
        <ToastContainer/>
         <main className="flex w-full justify-center items-center  gap-[1rem] bg-white h-[100vh] px-[1rem]">
             <form onSubmit={onSubmit} className="flex flex-col gap-[1rem] w-[50%] items-center">
            <label htmlFor="username" className="text-2xl font-bold">Enter username</label>
            <input type="text" name="username" value={username} onChange={(e)=>{
                setUsername(e.target.value)
            }} className="border-[2px] border-[#000] rounded-[0.5rem] px-[1rem] py-1 w-[40%]"/>
            <label htmlFor="password" className="text-2xl font-bold">Enter password</label>
            <input type="password" value={password} name="password"  onChange={(e)=>{
                setPassword(e.target.value)

            }} className="border-[2px] border-[#000] rounded-[0.5rem] px-[1rem] py-1 w-[40%]" />
            <button type="submit" className="w-[40%] bg-[#A4BCFD] text-white px-[1rem] py-[0.5rem] rounded-[0.5rem] cursor-pointer">Submit</button>
            </form>
            <Image src={'/heroOne.avif'} width={400} height={400} alt="Logo" className="w-[50%] rounded-[0.5rem]"/>
        </main>
        </>
       
    )
}