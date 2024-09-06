import { cookies } from 'next/headers'
import { Login } from '@/components/login'
import { redirect } from 'next/navigation'

export default async function LogIn() {
  const user = JSON.parse(cookies().get('user')?.value ?? '{}')
  if (user.name) redirect('/home')
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-slate-800">
      <Login />
    </main>
  )
}
