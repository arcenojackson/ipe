import { db } from '@/database/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { rows } = await db.sql`
      SELECT id, name FROM categories
      ORDER BY name ASC;
    `
    return NextResponse.json({ message: 'OK', data: rows }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}
