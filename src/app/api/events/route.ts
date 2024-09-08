import { db } from '@/database/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { rows } = await db.sql`
      SELECT id, name, date FROM events ORDER BY date ASC;
    `
    return NextResponse.json({ message: 'OK', data: rows }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const { name, date, start } = await req.json()
  try {
    const { rows } = await db.sql`
    INSERT INTO events (name, date, start)
    VALUES (${name}, ${date}, ${start})
    RETURNING *;
    `
    const music = rows[0]
    return NextResponse.json({ message: 'OK', data: music }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}
