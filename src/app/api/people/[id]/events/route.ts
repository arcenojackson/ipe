import { db } from '@/database/db'
import { NextResponse } from 'next/server'

type RouteProps = {
  params: { id: string }
}

export async function GET(_: Request, { params }: RouteProps) {
  try {
    const { id } = params
    const { rows } = await db.sql`
      SELECT events.id, events.name, events.date, events.start, events_contents.people
      FROM events INNER JOIN events_contents ON (events.id = events_contents.event_id)
      ORDER BY events.date ASC;
    `
    const data = rows?.filter((row) => row?.people?.includes(id) && new Date() < new Date(row.date))
    return NextResponse.json({ message: 'Eventos do usuários', data }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 })
  }
}
