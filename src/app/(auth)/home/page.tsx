'use client'

import { Button } from "@/components/ui/button"
import { useCookies } from "next-client-cookies"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const cookies = useCookies()
  const user = JSON.parse(cookies.get('user') ?? '{}')

  if (!user?.email) return
  console.log(user)

  function logout() {
    cookies.remove('user')
    router.replace('/')
  }

  return (
    <main>
      <h1>Olá {user.email}</h1>
      <Button onClick={logout}>Sair</Button>
    </main>
  )
}