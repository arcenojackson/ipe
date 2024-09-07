import { db } from '@/database/db'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest) {
  try {
    const { rows } = await db.sql`
      SELECT id, title, artist FROM musics ORDER BY title ASC;
    `
    return NextResponse.json({ message: 'OK', data: rows }, { status: 200 })
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
