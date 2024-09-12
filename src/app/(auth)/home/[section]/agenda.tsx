import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Event } from '@/types/event'
import { User } from '@/types/user'
import { format } from 'date-fns'
import { Calendar, ThumbsDown, ThumbsUp, TreePalm } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type PeopleProps = {
  currentUser: Partial<User>
}

export function Agenda({ currentUser }: PeopleProps) {
  const [agendas, setAgendas] = useState<Event[]>([])

  useEffect(() => {
    ;(async () => loadAgendas())()
  }, [])

  const loadAgendas = useCallback(async () => {
    const response = await fetch(`/api/users/${currentUser.id}/events`)
    const result = await response.json()
    console.log(result.data)
    setAgendas(result.data)
  }, [])

  return (
    <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-scroll">
      {!agendas.length ? (
        <div className="flex flex-col items-center gap-8 mt-8">
          <span className="font-semibold text-center text-xl text-slate-50">
            Você não está escalado para nenhum evento por enquanto...
          </span>
          <TreePalm size={60} color="white" />
        </div>
      ) : (
        agendas.map((agenda) => (
          <Card bgColor="bg-slate-800">
            <Card.Icon bgColor="bg-emerald-600 mr-4">
              <Calendar size={28} color="white" />
            </Card.Icon>
            <Card.Content>
              <span>{agenda.name}</span>
              <span className="text-xs text-slate-300">
                {agenda.start}h {format(new Date(agenda.date), 'dd/MM/yyyy')}
              </span>
            </Card.Content>
          </Card>
        ))
      )}
    </div>
  )
}
