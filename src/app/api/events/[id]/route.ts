import { db } from '@/database/db'
import { NextResponse } from 'next/server'

type RouteProps = {
  params: { id: string }
}

export async function GET(_: Request, { params }: RouteProps) {
  try {
    const { rows } = await db.sql`
    SELECT events.name, events.date, events.start,
      events_contents.steps, events_contents.people
    FROM events
    INNER JOIN events_contents ON(events.id = events_contents.event_id)
    WHERE events.id = ${params.id};
    `
    if (!rows.length)
      return NextResponse.json({ message: 'Evento não encontrada.' }, { status: 404 })
    const event = rows[0]
    return NextResponse.json({ message: 'OK', data: event }, { status: 200 })
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
    const event = rows[0]
    return NextResponse.json(
      { message: 'Evento atualizado com sucesso.', data: event },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    await db.sql`
      DELETE FROM events_contents WHERE event_id = ${params.id}
    `
    await db.sql`
      DELETE FROM events WHERE id = ${params.id};
    `
    return NextResponse.json({ message: 'Evento excluído com sucesso.' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}
