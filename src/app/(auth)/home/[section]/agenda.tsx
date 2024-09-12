import { Card } from '@/components/ui/card'
import { Loading } from '@/components/ui/loading'
import { Event } from '@/types/event'
import { User } from '@/types/user'
import { format } from 'date-fns'
import { BookPlus, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type PeopleProps = {
  currentUser: Partial<User>
}

export function Agenda({ currentUser }: PeopleProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { push } = useRouter()
  const [agendas, setAgendas] = useState<Event[]>([])

  useEffect(() => {
    ;(async () => loadAgendas())()
  }, [])

  const loadAgendas = useCallback(async () => {
    const response = await fetch(`/api/users/${currentUser.id}/events`)
    const result = await response.json()
    setAgendas(result.data)
    setIsLoading(false)
  }, [])

  return (
    <div
      className={`flex flex-col flex-1 ${
        isLoading && 'items-center justify-center'
      } gap-4 p-4 overflow-y-scroll`}
    >
      {isLoading ? (
        <Loading />
      ) : !agendas.length ? (
        <div className="flex flex-col items-center gap-8 mt-8">
          <span className="font-semibold text-center text-xl text-slate-50">
            Você não está escalado para nenhum evento por enquanto...
          </span>
          <BookPlus size={60} color="white" />
          <span className="font-normal text-center text-lg text-slate-50">
            Aproveite para treinar músicas novas 😉
          </span>
        </div>
      ) : (
        agendas.map((agenda) => (
          <Card bgColor="bg-slate-800" key={agenda.id}>
            <div className="w-full flex" onClick={() => push(`/event/${agenda.id}/view`)}>
              <Card.Icon bgColor="bg-emerald-600 mr-4">
                <Calendar size={28} color="white" />
              </Card.Icon>
              <Card.Content>
                <span>{agenda.name}</span>
                <span className="text-xs text-slate-300">
                  {agenda.start}h {format(new Date(agenda.date), 'dd/MM/yyyy')}
                </span>
              </Card.Content>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
