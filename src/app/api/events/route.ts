import { db } from '@/database/db'
import { EventSteps } from '@/types/event'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { rows } = await db.sql`
      SELECT id, name, date FROM events
      WHERE DATE(date) >= DATE(NOW())
      ORDER BY date ASC;
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
    const event = rows[0]
    const steps: EventSteps[] = [
      { title: 'Prelúdio', description: 'opcional', type: 'step' },
      { title: 'Chamada à Oração', description: 'Pedidos públicos de oração', type: 'step' },
      {
        title: 'Saudação a todos',
        description: 'Informar sobre o direito de imagem',
        type: 'step'
      },
      { title: 'Leitura Bíblica: ', description: '(Adoração e louvor)', type: 'step' },
      { title: 'Cântico: ', description: '', type: 'step' },
      { title: 'Leitura Bíblica: ', description: '(Confissão e Contrição)', type: 'step' },
      { title: 'Cântico: ', description: '*Dízimos', type: 'step' },
      { title: 'Oração', description: '', type: 'step' },
      { title: 'Equipe de louvor:', description: '', type: 'step' },
      { title: 'Chamada para culto infantil e de adolescentes', description: '', type: 'step' },
      { title: 'Mensagem', description: '', type: 'step' },
      { title: 'Leitura Bíblica: ', description: '', type: 'step' },
      { title: 'Tema da mensagem: ', description: '', type: 'step' },
      { title: 'Oração final', description: '', type: 'step' },
      { title: 'Benção', description: '', type: 'step' },
      { title: 'Avisos', description: '', type: 'step' },
      { title: 'Poslúdio', description: 'opcional', type: 'step' }
    ]
    await db.sql`
    INSERT INTO events_contents (event_id, steps)
    VALUES (${event.id}, ${JSON.stringify(steps)})
    `
    return NextResponse.json({ message: 'OK', data: event }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Erro Interno.' }, { status: 500 })
  }
}
