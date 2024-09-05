const user = JSON.parse(localStorage.getItem('user') || '{}')

export default function Home() {
  if (!user.email) return
  return <h1>Olá {user.email}</h1>
}