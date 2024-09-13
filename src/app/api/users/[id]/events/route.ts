import { db } from '@/database/db'
import { NextResponse } from 'next/server'

type RouteProps = {
  params: { id: string }
}

export async function GET(_: Request, { params }: RouteProps) {
  try {
    const { id } = params
    const { rows } = await db.sql`
      WITH user_ids AS (
        SELECT jsonb_array_elements_text(people) AS user_id
        FROM events_contents
      )
      SELECT events.id, events.name, events.date, events.start
      FROM events
      INNER JOIN events_contents ON (events.id = events_contents.event_id)
      INNER JOIN user_ids ON (user_ids.user_id = ${id})
    `
    const data = rows
    return NextResponse.json({ message: 'Eventos do usuários', data }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 })
  }
}
