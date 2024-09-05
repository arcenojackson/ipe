import { NextResponse } from "next/server"
import { db } from "@/database/db"
import { comparePassword, generatePasswordHash } from "@/lib/hashing"

type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const { rows } = await db.sql<User>`SELECT * FROM users WHERE email = ${email};`
    if (!!rows.length)
      return NextResponse.json({ message: 'Email já cadastrado.' }, { status: 400 })
    const passwordHash = generatePasswordHash(password)
    const { rows: result } = await db.sql<User>`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${passwordHash})
      RETURNING *;
    `
    console.log(result[0])
    const [userCreated] = result
    const user = {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email
    }
    return NextResponse.json({ message: 'Login realizado com sucesso', user }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }  
}