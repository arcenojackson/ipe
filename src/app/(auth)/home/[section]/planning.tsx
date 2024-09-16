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
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Event } from '@/types/event'
import { format } from 'date-fns'
import { Calendar, Edit, PlusCircle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export function Planning() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editEventId, setEditEventId] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const { toast } = useToast()
  const { push } = useRouter()

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
      <div className="flex flex-col h-[calc(100vh-300px)] items-center gap-2 mt-4 px-4 overflow-y-auto">
        {isLoading && <Loading />}
        {events.map((event) => (
          <Card height="h-24" bgColor="bg-slate-800" key={event.id}>
            <div className="w-full flex" onClick={() => push(`/event/${event.id}`)}>
              <Card.Icon>
                <Calendar size={28} color="white" fill="white" />
              </Card.Icon>
              <Card.Content>
                <span className="text-sm">{event.name}</span>
                <span className="text-xs text-slate-300">{format(event.date, 'dd/MM/yy')}</span>
              </Card.Content>
            </div>
            <Card.Actions>
              <Sheet
                open={editEventId === event.id}
                onOpenChange={() => setEditEventId(editEventId ? null : event.id!)}
              >
                <SheetTrigger>
                  <Edit size={26} color="white" />
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-xl mx-4">
                  <SheetHeader>
                    <SheetTitle>Editar evento</SheetTitle>
                  </SheetHeader>
                  <EventEdit
                    id={event.id}
                    loadData={loadData}
                    closeModal={() => setEditEventId(null)}
                  />
                  <SheetFooter></SheetFooter>
                </SheetContent>
              </Sheet>
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
      <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
        <SheetTrigger className="w-full p-4">
          <div className="h-12 flex items-center justify-center bg-slate-950 rounded-lg text-slate-200">
            <PlusCircle className="mr-4" />
            Adicionar evento
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-xl mx-4">
          <SheetHeader>
            <SheetTitle>Nova evento</SheetTitle>
          </SheetHeader>
          <EventEdit loadData={loadData} closeModal={() => setIsAddOpen(false)} />
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
