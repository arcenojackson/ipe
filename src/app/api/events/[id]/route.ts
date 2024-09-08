import { db } from '@/database/db'
import { NextResponse } from 'next/server'

type RouteProps = {
  params: { id: string }
}

export async function GET(_: Request, { params }: RouteProps) {
  try {
    const { rows } = await db.sql`
      SELECT name, date, start
      FROM events WHERE id = ${params.id};
    `
    if (!rows.length)
      return NextResponse.json({ message: 'Evento não encontrada.' }, { status: 404 })
    const music = rows[0]
    return NextResponse.json({ message: 'OK', data: music }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: RouteProps) {
  const { name, date, start } = await req.json()
  try {
    const { rows } = await db.sql`
      UPDATE events 
      SET name = ${name},
          date = ${date},
          start = ${start}
      WHERE id = ${params.id}
      RETURNING *;
    `
    const music = rows[0]
    return NextResponse.json(
      { message: 'Evento atualizado com sucesso.', data: music },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    await db.sql`
      DELETE FROM events WHERE id = ${params.id};
    `
    return NextResponse.json({ message: 'Evento excluído com sucesso.' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}
