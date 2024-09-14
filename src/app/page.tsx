import { Login } from '@/components/login'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LogIn() {
  const storedUser = cookies().get('user')?.value || '{}'
  const user = JSON.parse(storedUser)
  if (user.name) redirect('/home/agenda')
  return (
    <main className="w-full h-screen flex flex-col items-center pt-20 px-10 bg-slate-800">
      <Login />
    </main>
  )
}
