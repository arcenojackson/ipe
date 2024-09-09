import { EventEdit } from '@/components/events/edit'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Loading } from '@/components/ui/loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Event } from '@/types/event'
import { format } from 'date-fns'
import { Calendar, Edit, PlusCircle, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export function Planning() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>([])
  const { toast } = useToast()

  useEffect(() => {
    ;(async () => await loadData())()
  }, [])

  const loadData = useCallback(async () => {
    try {
      const response = await fetch('/api/events')
      const result = await response.json()
      if (response.status !== 200) throw new Error(result.message)
      setEvents(result.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast({
        title: 'Eventos',
        description: 'Erro ao listar eventos',
        variant: 'destructive'
      })
    }
  }, [events])

  async function onDeleteEvent(id: string) {
    await fetch(`/api/events/${id}`, { method: 'DELETE' })
    setIsLoading(true)
    await loadData()
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-center gap-4 p-4 overflow-y-scroll">
        {isLoading && <Loading />}
        {events.map((event) => (
          <Card height="h-24" bgColor="bg-slate-800" key={event.id}>
            <div className="w-full flex">
              <Card.Icon>
                <Calendar size={28} color="white" fill="white" />
              </Card.Icon>
              <Card.Content>
                <span className="text-sm">{event.name}</span>
                <span className="text-xs text-slate-300">{format(event.date, "dd 'de' MMMM")}</span>
              </Card.Content>
            </div>
            <Card.Actions>
              <Dialog>
                <DialogTrigger>
                  <Edit size={26} color="white" />
                </DialogTrigger>
                <DialogContent className="rounded-xl">
                  <DialogHeader>
                    <DialogTitle>Editar evento</DialogTitle>
                  </DialogHeader>
                  <EventEdit id={event.id} loadData={loadData} />
                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash2 size={26} color="red" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deseja mesmo excluir este evento?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não poderá ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDeleteEvent(event.id!)}>
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card.Actions>
          </Card>
        ))}
      </div>
      <Dialog>
        <DialogTrigger className="w-full p-4">
          <div className="h-12 flex items-center justify-center bg-slate-950 rounded-lg text-slate-200">
            <PlusCircle className="mr-4" />
            Adicionar evento
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Nova evento</DialogTitle>
          </DialogHeader>
          <EventEdit loadData={loadData} />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
