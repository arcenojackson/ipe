import { db } from '@/database/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { rows } = await db.sql`SELECT id, name, email FROM users`
    console.warn('rows', rows)
    return NextResponse.json({ message: 'Lista de usuários.', data: rows }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 })
  }
}
