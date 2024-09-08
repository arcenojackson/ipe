import { db } from '@/database/db'
import { User } from '@/types/user'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { rows } = await db.sql<Partial<User>>`SELECT id, name, email FROM users`
    if (!rows.length)
      return NextResponse.json({ message: 'Usuários não encontrados.' }, { status: 404 })
    return NextResponse.json({ message: 'Lista de usuários.', data: rows }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 })
  }
}
