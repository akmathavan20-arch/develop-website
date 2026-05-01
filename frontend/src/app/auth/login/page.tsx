'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
export default function LoginPage(){const router=useRouter();const [email,setEmail]=useState('');const [password,setPassword]=useState('');const onSubmit=async()=>{const data=await api('/auth/login','POST',{email,password});localStorage.setItem('token',data.token);router.push(`/${data.role}`)};return <main style={{padding:24}}><h2>Login</h2><input placeholder='Email' onChange={e=>setEmail(e.target.value)}/><input type='password' placeholder='Password' onChange={e=>setPassword(e.target.value)}/><button onClick={onSubmit}>Login</button></main>}
