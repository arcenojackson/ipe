import { db } from '@/database/db'
import { NextResponse } from 'next/server'

type RouteProps = {
  params: { id: string }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    await db.sql`
      DELETE FROM users WHERE id = ${params.id};
    `
    return NextResponse.json({ message: 'Usuário excluído com sucesso.' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }
}
