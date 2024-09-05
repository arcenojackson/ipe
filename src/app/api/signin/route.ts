import { db } from '@/database/db'
import { comparePassword } from '@/lib/hashing'
import { NextResponse } from 'next/server'

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
    const { rows } = await db.sql<User>`SELECT * FROM users WHERE email = ${email};`
    if (!rows.length)
      return NextResponse.json({ message: 'Email ou senha inválidos.' }, { status: 400 })
    const [userFound] = rows
    const isPasswordValid = comparePassword(userFound.password, password)
    if (!isPasswordValid)
      return NextResponse.json({ message: 'Email ou senha inválidos.' }, { status: 400 })
    const user = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email
    }
    return NextResponse.json({ message: 'Login realizado com sucesso', user }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }
}
