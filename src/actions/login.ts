'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function rollback(error: string) {
  cookies().delete('user')
  cookies().set('errorMessage', error)
  redirect('/')
}

export async function submitSignin(formData: FormData) {
  const user = {
    id: '',
    name: '',
    email: formData.get('email')?.toString() ?? ''
  }
  const password = formData.get('password')?.toString()
  if (!user.email || !password) return rollback('Campos inválidos')
  try {
    const response = await fetch('http://localhost:3000/api/signin', {
      method: 'POST',
      body: JSON.stringify({ email: user.email, password })
    })
    const result = await response.json()
    if (response.status !== 200) return rollback(result.message)
    user.id = result.user.id
    user.name = result.user.name
  } catch (error: any) {
    console.log(error)
    return rollback(error.message)
  }
  cookies().set('user', JSON.stringify(user))
  redirect('/home')
}

export async function submitSignup(formData: FormData) {
  const user = {
    id: '',
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? ''
  }
  const password = formData.get('password')
  const confirmPass = formData.get('confirmPass')
  if (!user.name || !user.email || !password || !confirmPass) return
  if (password !== confirmPass) return rollback('Senhas precisam ser iguais')
  try {
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name: user.name, email: user.email, password })
    })
    const result = await response.json()
    if (response.status !== 200) return rollback(result.message)
    user.id = result.user.id
  } catch (error: any) {
    return rollback(error.message)
  }
  cookies().set('user', JSON.stringify(user))
  redirect('/home')
}
