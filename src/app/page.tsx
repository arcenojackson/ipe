import { Login } from '@/components/login'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LogIn() {
  const storedUser = cookies().get('user')?.value || '{}'
  const user = JSON.parse(storedUser)
  if (user.name) redirect('/home')
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-slate-800">
      <Login />
    </main>
  )
}
