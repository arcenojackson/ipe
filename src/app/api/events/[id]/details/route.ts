import { db } from '@/database/db'
import { NextResponse } from 'next/server'

type RouteProps = {
  params: { id: string }
}

export async function PUT(req: Request, { params }: RouteProps) {
  const { steps, people } = await req.json()
  try {
    const { rows } = await db.sql`
      UPDATE events_contents
      SET steps = ${JSON.stringify(steps)},
        people = ${JSON.stringify(Array.from(people))}
      WHERE event_id = ${params.id}
      RETURNING *;
    `
    const event = rows[0]
    return NextResponse.json(
      { message: 'Evento atualizado com sucesso.', data: event },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}
