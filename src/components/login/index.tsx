'use client'

import { useState } from "react"
import { SignIn } from "./sigin"
import { SignUp } from "./signup"
import { useCookies } from "next-client-cookies"

export function Login() {
  const cookies = useCookies();
  const [type, setType] = useState<'signin' | 'signup'>('signin')
  console.log(cookies.get('errorMessage'))
  
  if (type === 'signin') return <SignIn setLoginType={setType} />

  return <SignUp setLoginType={setType} />
}