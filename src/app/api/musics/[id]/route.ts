import { db } from '@/database/db'
import { NextResponse } from 'next/server'

type RouteProps = {
  params: { id: string }
}

export async function GET(_: Request, { params }: RouteProps) {
  try {
    const { rows } = await db.sql`
      SELECT title, artist, obs, youtube, cipher, lyrics, bpm, tempo, tone, minor_tone
      FROM musics WHERE id = ${params.id};
    `
    if (!rows.length)
      return NextResponse.json({ message: 'Musica não encontrada.' }, { status: 404 })
    const music = rows[0]
    return NextResponse.json({ message: 'OK', data: music }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: RouteProps) {
  const { title, artist, obs, youtube, cipher, lyrics, bpm, tempo, tone, minorTone } =
    await req.json()
  try {
    const { rows } = await db.sql`
      UPDATE musics 
      SET title = ${title},
          artist = ${artist},
          obs = ${obs},
          youtube = ${youtube},
          cipher = ${cipher},
          lyrics = ${lyrics},
          bpm = ${bpm},
          tempo = ${tempo},
          tone = ${tone},
          minor_tone = ${minorTone}
      WHERE id = ${params.id}
      RETURNING *;
    `
    const music = rows[0]
    return NextResponse.json(
      { message: 'Música atualizada com sucesso.', data: music },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    await db.sql`
      DELETE FROM musics WHERE id = ${params.id};
    `
    return NextResponse.json({ message: 'Música excluída com sucesso.' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }
}
