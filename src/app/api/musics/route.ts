import { db } from '@/database/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { rows } = await db.sql`
      SELECT id, title, artist, tone FROM musics ORDER BY title ASC;
    `
    const { rows: users } =
      await db.sql`SELECT id, name, email, is_admin FROM people WHERE email <> 'master@ipe.com' ORDER BY name ASC;`
    return NextResponse.json({ message: 'OK', data: rows, users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const { title, artist, obs, youtube, cipher, lyrics, bpm, tempo, tone } = await req.json()
  try {
    const { rows } = await db.sql`
    INSERT INTO musics (title, artist, obs, youtube, cipher, lyrics, bpm, tempo, tone)
    VALUES (${title}, ${artist}, ${obs}, ${youtube}, ${cipher}, ${lyrics}, ${bpm}, ${tempo}, ${tone})
    RETURNING *;
    `
    const music = rows[0]
    return NextResponse.json({ message: 'OK', data: music }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal error' }, { status: 500 })
  }
}
