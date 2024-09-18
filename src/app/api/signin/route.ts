import { db } from '@/database/db'
import { comparePassword } from '@/lib/hashing'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const { rows } = await db.sql`SELECT * FROM people WHERE email = ${email};`
    if (!rows.length)
      return NextResponse.json({ message: 'Email ou senha inválidos.' }, { status: 400 })
    const [userFound] = rows
    const isPasswordValid = comparePassword(userFound.password!, password)
    if (!isPasswordValid)
      return NextResponse.json({ message: 'Email ou senha inválidos.' }, { status: 400 })
    const user = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      is_admin: userFound.is_admin
    }
    console.log(user)
    return NextResponse.json({ message: 'Login realizado com sucesso', user }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }
}
