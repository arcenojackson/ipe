import { NextResponse } from "next/server"
import { db } from "@/database/db"

type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    await db.connect()
    const { rows } = await db.sql<User>`SELECT * FROM users WHERE email='${email}'`
    await db.end()
    if (!rows)
      return NextResponse.json({ message: 'Email ou senha inválidos.' }, { status: 400 })
    const user = rows[0]
    if (user.password !== password)
      return NextResponse.json({ message: 'Email ou senha inválidos.' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }  
}