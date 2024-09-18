import { db } from '@/database/db'
import { NextResponse } from 'next/server'

type RouteProps = {
  params: { id: string }
}

export async function PUT(req: Request, { params }: RouteProps) {
  try {
    const { is_admin } = await req.json()
    await db.sql`UPDATE people SET is_admin = ${is_admin} WHERE id = ${params.id}`
    return NextResponse.json({ message: 'OK' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    await db.sql`
      DELETE FROM people WHERE id = ${params.id};
    `
    return NextResponse.json({ message: 'Usuário excluído com sucesso.' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }
}
