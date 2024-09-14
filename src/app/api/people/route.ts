import { db } from '@/database/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { rows } = await db.sql`
      SELECT id, name, email FROM people ORDER BY name ASC;
    `
    console.warn('rows')
    console.warn(rows)
    return NextResponse.json({ message: 'OK', data: rows }, { status: 200 })
  } catch (error) {
    console.error('error')
    console.error(error)
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 })
  }
}
