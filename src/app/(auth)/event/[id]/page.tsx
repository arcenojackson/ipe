'use client'

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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Loading } from '@/components/ui/loading'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { EventSteps } from '@/types/event'
import { Music } from '@/types/music'
import { User } from '@/types/user'
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import {
  ArrowLeftCircle,
  CheckIcon,
  Grip,
  GripVertical,
  PlusCircle,
  Save,
  Trash2,
  User2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type EventProps = {
  params: { id: string }
}

export default function Event({ params }: EventProps) {
  const { id } = params
  const { replace } = useRouter()
  const [eventName, setEventName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [steps, setSteps] = useState<EventSteps[]>([])
  const [typeOfAdd, setTypeOfAdd] = useState('step')
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false)
  const [goBackOpen, setGoBackOpen] = useState(false)
  const [updatingStep, setUpdatingStep] = useState<EventSteps | null>(null)
  const [addingStep, setAddingStep] = useState<EventSteps | null>(null)
  const [musics, setMusics] = useState<Music[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [people, setPeople] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      loadEventSteps()
      loadMusics()
      setIsLoading(false)
    })()
  }, [])

  const reorder = (list: EventSteps[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return
      setSteps((prev) => {
        const items = reorder(prev, result.source.index, result.destination!.index)
        return items
      })
    },
    [steps]
  )

  const loadEventSteps = useCallback(async () => {
    const response = await fetch(`/api/events/${id}`)
    const result = await response.json()
    setSteps(result.data.steps)
    const name = `${result.data.name} (${format(result.data.date, 'dd/MM')})`
    setEventName(name)
    if (result.data.people) setPeople(result.data.people)
  }, [])

  const loadMusics = useCallback(async () => {
    const response = await fetch('/api/musics')
    const result = await response.json()
    if (result.data) setMusics(result.data)
    if (result.users) setUsers(result.users)
  }, [])

  const onDeleteStep = (index: number) => {
    const items = Array.from(steps)
    items.splice(index, 1)
    setSteps(items)
  }

  function onUpdateStep(index: number) {
    if (!updatingStep) return
    const currentSteps = Array.from(steps)
    currentSteps[index] = updatingStep
    setSteps(currentSteps)
    setUpdatingId(null)
  }

  async function onSave() {
    setIsSaving(true)
    const body = JSON.stringify({
      steps,
      people
    })
    await fetch(`/api/events/${id}/details`, {
      method: 'PUT',
      body
    })
    replace('/home/planning')
  }

  return (
    <main className="w-full h-screen flex flex-col bg-slate-600">
      <header className="flex items-center justify-center gap-6 p-4 bg-slate-800">
        <h1 className="text-lg text-slate-50">
          Evento: <span className="font-bold">{eventName}</span>
        </h1>
      </header>
      <Tabs
        defaultValue="steps"
        className={`flex flex-col flex-1 px-4 pb-4 overflow-hidden ${isSaving && 'items-center justify-center'}`}
      >
        <div className="flex justify-between">
          <Button
            className="w-28 flex gap-2 my-2 text-slate-100"
            variant="link"
            onClick={() => setGoBackOpen(true)}
          >
            <ArrowLeftCircle />
            Voltar
          </Button>
          <Button
            className="w-28 flex gap-2 my-2 text-slate-100"
            variant="link"
            disabled={isLoading}
            onClick={onSave}
          >
            Salvar
            <Save />
          </Button>
        </div>
        <TabsList className="w-full flex py-6 bg-slate-800 text-slate-100">
          <TabsTrigger value="steps">Etapas</TabsTrigger>
          <TabsTrigger value="team">Equipe</TabsTrigger>
        </TabsList>
        {isSaving ? (
          <Loading color="h-[calc(100vh-300px)] text-slate-50 mt-10" />
        ) : (
          <>
            <TabsContent
              value="steps"
              className={`flex-1 p-4 overflow-auto rounded-lg bg-slate-800 ${
                isLoading && 'flex flex-col items-center justify-center'
              }`}
            >
              {isLoading ? (
                <Loading color="h-[calc(100vh-300px)] text-slate-50 mt-10" />
              ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable" type="STEPS">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        className="h-[calc(100vh-300px)] overflow-scroll"
                        {...provided.droppableProps}
                      >
                        {steps.map((step, index) => (
                          <Draggable
                            draggableId={`${step.title}-${index}`}
                            key={`${step.title}-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`flex items-center py-4 pr-4 mb-1 border ${
                                  snapshot.isDragging
                                    ? 'bg-slate-600 text-slate-100'
                                    : 'bg-slate-200'
                                }`}
                              >
                                <GripVertical size={30} color="gray" />
                                <span
                                  onClick={() => {
                                    setUpdatingStep(step)
                                    setUpdatingId(index)
                                  }}
                                  className="ml-4 flex-1 text-left font-bold text-sm"
                                >
                                  {step.title}
                                  <p className="text-xs font-normal">{step.description}</p>
                                  {step.type === 'music' && <Badge variant="default">Música</Badge>}
                                </span>
                                <Sheet
                                  open={updatingId === index}
                                  onOpenChange={() => setUpdatingId(updatingId ? null : index)}
                                >
                                  <SheetContent
                                    side="bottom"
                                    className="flex flex-col gap-4 mx-4 py-10 rounded-t-lg"
                                  >
                                    <SheetHeader>
                                      <SheetTitle>
                                        Editar {updatingStep?.type === 'music' ? 'música' : 'etapa'}
                                      </SheetTitle>
                                      <SheetDescription>
                                        {updatingStep?.type === 'music' &&
                                          'Obs.: Para alterar uma música, você precisa excluir a atual e adicionar uma nova'}
                                      </SheetDescription>
                                    </SheetHeader>
                                    <label htmlFor="title">Título</label>
                                    <Input
                                      id="title"
                                      name="title"
                                      value={updatingStep?.title}
                                      onChange={(e) =>
                                        setUpdatingStep({
                                          ...updatingStep!,
                                          title: e.target.value
                                        })
                                      }
                                    />
                                    <label htmlFor="description">Descrição</label>
                                    <Input
                                      id="description"
                                      name="description"
                                      value={updatingStep?.description}
                                      onChange={(e) =>
                                        setUpdatingStep({
                                          ...updatingStep!,
                                          description: e.target.value
                                        })
                                      }
                                    />
                                    {updatingStep?.type === 'music' && updatingStep?.musicTone && (
                                      <>
                                        <label htmlFor="musicTone">Tom</label>
                                        <Input
                                          id="musicTone"
                                          name="musicTone"
                                          value={updatingStep?.musicTone}
                                          onChange={(e) =>
                                            setUpdatingStep({
                                              ...updatingStep!,
                                              musicTone: e.target.value
                                            })
                                          }
                                        />
                                      </>
                                    )}
                                    <div className="w-full flex flex-col gap-2 mt-4">
                                      <Button
                                        onClick={() => onUpdateStep(index)}
                                        variant="secondary"
                                      >
                                        Salvar
                                      </Button>
                                      <Button onClick={() => setUpdatingId(null)} variant="outline">
                                        Fechar
                                      </Button>
                                    </div>
                                  </SheetContent>
                                </Sheet>
                                <AlertDialog>
                                  <AlertDialogTrigger>
                                    <Trash2 size={30} color="red" />
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Deseja mesmo remover esta etapa?
                                      </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => onDeleteStep(index)}>
                                        Excluir
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
              <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetTrigger className="w-full flex gap-4 py-4">
                  <div className="w-full flex items-center justify-center gap-4 p-4 rounded-lg bg-slate-100 text-slate-900">
                    <PlusCircle />
                    Adicionar item
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="flex flex-col gap-4 mx-4 py-10 rounded-t-lg">
                  <SheetHeader>
                    <SheetTitle>Adicionar</SheetTitle>
                  </SheetHeader>
                  <Select
                    defaultValue={typeOfAdd}
                    onValueChange={async (value) => {
                      setTypeOfAdd(value)
                      setAddingStep({
                        ...addingStep!,
                        type: value as 'music' | 'step'
                      })
                      if (value === 'music') await loadMusics()
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipo</SelectLabel>
                        <SelectItem value="step">Etapa</SelectItem>
                        <SelectItem value="music">Música</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {typeOfAdd === 'step' && (
                    <>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Título da etapa"
                        value={addingStep?.title}
                        onChange={(e) =>
                          setAddingStep({
                            ...addingStep!,
                            title: e.target.value
                          })
                        }
                      />
                      <Input
                        id="description"
                        name="description"
                        placeholder="Descrição da etapa"
                        value={addingStep?.description}
                        onChange={(e) =>
                          setAddingStep({
                            ...addingStep!,
                            description: e.target.value
                          })
                        }
                      />
                    </>
                  )}
                  {typeOfAdd === 'music' && (
                    <>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={true}
                            className="w-full justify-between"
                          >
                            {addingStep?.musicId
                              ? musics.find((music) => music.id === addingStep?.musicId)?.title
                              : 'Selecione uma música...'}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              autoFocus={false}
                              placeholder="Buscar música..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>Nenhuma música encontrada.</CommandEmpty>
                              <CommandGroup>
                                {musics.map((music) => (
                                  <CommandItem
                                    key={music.id}
                                    value={music.id}
                                    onSelect={(currentValue) => {
                                      setAddingStep({
                                        ...addingStep!,
                                        title: music.title,
                                        description: '',
                                        type: 'music',
                                        musicId:
                                          currentValue === addingStep?.musicId ? '' : currentValue,
                                        musicTone: music.tone
                                      })
                                    }}
                                  >
                                    {music.title}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        addingStep?.musicId === music.id
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Input
                        id="musicTone"
                        name="musicTone"
                        placeholder="Tom da música"
                        value={addingStep?.musicTone}
                        onChange={(e) =>
                          setAddingStep({
                            ...addingStep!,
                            musicTone: e.target.value
                          })
                        }
                      />
                    </>
                  )}
                  <SheetFooter>
                    <div className="w-full flex flex-col gap-2 mt-4">
                      <Button
                        onClick={() => {
                          setSteps((prev) => [...prev, addingStep!])
                          setAddingStep(null)
                          setIsAddOpen(false)
                        }}
                        variant="primary"
                      >
                        Salvar
                      </Button>
                      <Button onClick={() => setIsAddOpen(false)} variant="outline">
                        Fechar
                      </Button>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </TabsContent>
            <TabsContent value="team" className="flex-1 p-4 overflow-auto rounded-lg bg-slate-800">
              <div className="h-[calc(100vh-300px)] overflow-scroll w-full flex flex-col gap-1 pb-4">
                {users
                  .filter((user) => people.includes(user.id))
                  .map((user) => (
                    <Card height="h-20" bgColor="bg-slate-200" rounded="" key={user.id}>
                      <Card.Icon bgColor="bg-purple-800">
                        <User2 size={20} color="white" />
                      </Card.Icon>
                      <Card.Content>
                        <span className="text-slate-900">{user.name}</span>
                      </Card.Content>
                      <Card.Actions>
                        <Trash2
                          size={20}
                          color="red"
                          onClick={() =>
                            setPeople((prev) => {
                              const arr = Array.from(prev)
                              const indexToRemove = arr.findIndex((id) => id === user.id)
                              arr.splice(indexToRemove, 1)
                              setPeople(arr)
                              return arr
                            })
                          }
                        />
                      </Card.Actions>
                    </Card>
                  ))}
              </div>
              <Sheet open={isAddPeopleOpen} onOpenChange={setIsAddPeopleOpen}>
                <SheetTrigger className="w-full flex gap-4 py-4">
                  <div className="w-full flex items-center justify-center gap-4 p-4 rounded-lg bg-slate-100 text-slate-900">
                    <PlusCircle />
                    Adicionar pessoas
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="flex flex-col gap-4 mx-4 py-10 rounded-t-lg">
                  <SheetHeader>
                    <SheetTitle>Adicionar pessoas ao evento</SheetTitle>
                    <SheetDescription>Seleciona uma ou mais pessoas</SheetDescription>
                  </SheetHeader>
                  {users.map((user) => (
                    <div className="flex gap-4 items-center">
                      <Checkbox
                        id={user.id}
                        key={user.id}
                        checked={people?.includes(user.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? setPeople([...people, user.id])
                            : setPeople(people?.filter((value) => value !== user.id))
                        }}
                      />
                      <label htmlFor={user.id}>{user.name}</label>
                    </div>
                  ))}
                  <SheetFooter>
                    <div className="w-full flex flex-col gap-2 mt-4">
                      <Button onClick={() => setIsAddPeopleOpen(false)} variant="outline">
                        Fechar
                      </Button>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </TabsContent>
          </>
        )}
      </Tabs>
      <AlertDialog open={goBackOpen} onOpenChange={setGoBackOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja mesmo sair da edição do evento?</AlertDialogTitle>
            <AlertDialogDescription>
              Se você sair, as alterações não salvas serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => replace('/home/planning')}>Sair</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
