import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const formSchema = z.object({
  name: z.string().min(2),
  date: z.date(),
  start: z.string().min(2)
})

type Fields = 'name' | 'date' | 'start'

type EventProps = {
  id?: string
  loadData: () => Promise<void>
  closeModal?: () => void
}

export function EventEdit({ id, loadData, closeModal }: EventProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      date: undefined,
      start: ''
    }
  })

  useEffect(() => {
    console.log(id)
    if (!id) return
    ;(async () => {
      try {
        const response = await fetch(`/api/events/${id}`)
        const result = await response.json()
        if (response.status !== 200) {
          toast({
            title: 'Eventos',
            description: result.message,
            duration: 3000,
            variant: 'destructive'
          })
          return
        }
        const event = result.data
        for (const key in event) {
          const field: Fields = key as Fields
          if (field === 'date') {
            form.setValue(field, new Date(event[field]))
            continue
          }
          form.setValue(field, event[field])
        }
      } catch (error) {
        console.log(error)
      }
    })()
    return () => {
      id = undefined
      form.reset()
    }
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    if (id) {
      await fetch(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values)
      })
      return postSubmit('✓ Evento editado com sucesso!')
    }
    await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(values)
    })
    return postSubmit('✓ Evento adicionado com sucesso!')
  }

  async function postSubmit(description: string) {
    await loadData()
    setIsLoading(false)
    form.reset()
    if (closeModal) closeModal()
    toast({
      title: 'Eventos',
      description,
      variant: 'success',
      duration: 5000
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 h-[350px] border-t border-b overflow-x-scroll p-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do evento" {...field} value={field.value!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd 'de' MMMM")
                        ) : (
                          <span>Selecione o dia do evento</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Início</FormLabel>
              <FormControl>
                <Input placeholder="Horário de início do evento" {...field} value={field.value!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading} isLoading={isLoading}>
          Salvar evento
        </Button>
      </form>
    </Form>
  )
}
