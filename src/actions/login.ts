'use server'

import { useRouter } from "next/navigation"

export async function submitSignin(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')
  if (!email || !password) return 'failed'
  console.log(email, password)
  localStorage.setItem('user', JSON.stringify({ email, password }))
  useRouter().push("/home")
  return 'successful'
}

export async function submitSignup(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPass = formData.get('confirmPass')
  if (!name || !email || !password) return 'failed'
  console.log(name, email, password, confirmPass)
  return 'successful'
}
