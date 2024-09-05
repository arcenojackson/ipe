'use client'

import { useState } from "react"
import { SignIn } from "./sigin"
import { SignUp } from "./signup"

export function Login() {
  const [type, setType] = useState<'signin' | 'signup'>('signin')
  
  if (type === 'signin') return <SignIn setLoginType={setType} />

  return <SignUp setLoginType={setType} />
}