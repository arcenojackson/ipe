'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

type EventProps = {
  params: { id: string }
}

export default function Event({ params }: EventProps) {
  const { id } = params
  const { replace } = useRouter()

  return (
    <main className="w-full h-screen flex flex-col bg-slate-600">
      <header className="flex items-center gap-6 p-4 bg-slate-800">
        <Button className="flex gap-4" onClick={() => replace('/home/planning')}>
          <ArrowLeftCircle />
          Voltar
        </Button>
        <h1 className="text-lg text-slate-50">
          Evento: <span className="font-bold">Culto hoje</span>
        </h1>
      </header>
    </main>
  )
}
