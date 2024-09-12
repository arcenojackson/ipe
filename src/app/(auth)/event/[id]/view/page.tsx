'use client'

import { MusicView } from '@/components/music/view'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Loading } from '@/components/ui/loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EventSteps } from '@/types/event'
import { Music } from '@/types/music'
import { User } from '@/types/user'
import { ArrowLeftCircle, Music4Icon, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type EventProps = {
  params: { id: string }
}

export default function EventView({ params }: EventProps) {
  const { id } = params
  const { replace } = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatingStep, setUpdatingStep] = useState<EventSteps | null>(null)
  const [steps, setSteps] = useState<EventSteps[]>([])
  const [people, setPeople] = useState<string[]>([])
  const [eventMusics, setEventMusics] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [musics, setMusics] = useState<Music[]>([])

  useEffect(() => {
    ;(async () => {
      await loadEventSteps()
      await loadUsers()
      await loadMusics()
      setIsLoading(false)
    })()
  }, [])

  const loadEventSteps = useCallback(async () => {
    const response = await fetch(`/api/events/${id}`)
    const result = await response.json()
    const { steps, people } = result.data
    setSteps(steps)
    if (people) setPeople(people)
    const musics = Array.from<EventSteps>(steps)
      .filter((step) => step.type === 'music')
      .map((step) => step.musicId) as string[]
    setEventMusics(musics ?? [])
  }, [])

  const loadUsers = useCallback(async () => {
    const response = await fetch('/api/users')
    const result = await response.json()
    setUsers(result.data)
  }, [])

  const loadMusics = useCallback(async () => {
    const response = await fetch('/api/musics')
    const result = await response.json()
    if (result.data) setMusics(result.data)
  }, [])

  return (
    <main className="w-full h-screen flex flex-col bg-slate-600">
      <header className="flex items-center justify-center gap-6 p-4 bg-slate-800">
        <h1 className="text-lg text-slate-50">
          Evento: <span className="font-bold">Culto hoje</span>
        </h1>
      </header>
      <Tabs
        defaultValue="steps"
        className={`flex flex-col flex-1 px-4 pb-4 overflow-hidden ${
          isLoading && 'items-center justify-center'
        }`}
      >
        <div className="flex justify-between">
          <Button
            className="w-28 flex gap-2 my-2 text-slate-100"
            variant="link"
            onClick={() => replace('/home/agenda')}
          >
            <ArrowLeftCircle />
            Voltar
          </Button>
        </div>
        <TabsList className="w-full flex py-6 bg-slate-800 text-slate-100">
          <TabsTrigger value="steps">Etapas</TabsTrigger>
          <TabsTrigger value="musics">Músicas</TabsTrigger>
          <TabsTrigger value="team">Equipe</TabsTrigger>
        </TabsList>
        {isLoading ? (
          <Loading color="h-[calc(100vh-300px)] text-slate-50 mt-10" />
        ) : (
          <>
            <TabsContent
              value="steps"
              className={`flex-1 p-4 overflow-auto rounded-lg bg-slate-800 ${
                isLoading && 'flex flex-col items-center justify-center'
              }`}
            >
              {steps.map((step, index) => (
                <div
                  key={step.title + index}
                  className="flex items-center py-4 pr-4 mb-1 border bg-slate-200"
                >
                  {step.type === 'music' ? (
                    <Dialog>
                      <DialogTrigger className="w-full flex">
                        <span
                          onClick={() => {
                            setUpdatingStep(step)
                            setIsUpdateOpen(true)
                          }}
                          className="ml-4 flex-1 text-left font-bold text-sm"
                        >
                          {step.title}
                          <p className="text-xs font-normal">{step.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="default">Música</Badge>
                            <Badge className="w-10 flex items-center justify-center">
                              {step?.musicTone}
                            </Badge>
                          </div>
                        </span>
                      </DialogTrigger>
                      <DialogContent className="rounded-xl">
                        <DialogHeader>
                          <DialogTitle>
                            {musics.find((music) => music.id === step.musicId)?.title}
                          </DialogTitle>
                          <DialogDescription>
                            {musics.find((music) => music.id === step.musicId)?.artist}
                          </DialogDescription>
                        </DialogHeader>
                        <MusicView id={step.musicId} />
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <span
                      onClick={() => {
                        setUpdatingStep(step)
                        setIsUpdateOpen(true)
                      }}
                      className="ml-4 flex-1 text-left font-bold text-sm"
                    >
                      {step.title}
                      <p className="text-xs font-normal">{step.description}</p>
                    </span>
                  )}
                </div>
              ))}
            </TabsContent>
            <TabsContent
              value="musics"
              className="flex-1 p-4 overflow-auto rounded-lg bg-slate-800"
            >
              <div className="h-[calc(100vh-300px)] overflow-scroll w-full flex flex-col gap-1 pb-4">
                {musics
                  .filter((music) => eventMusics.includes(music.id!))
                  .map((music) => (
                    <Card height="h-20" bgColor="bg-slate-200" rounded="" key={music.id}>
                      <Dialog>
                        <DialogTrigger className="w-full flex">
                          <Card.Icon bgColor="bg-purple-800">
                            <Music4Icon size={20} color="white" />
                          </Card.Icon>
                          <Card.Content>
                            <span className="ml-4 text-slate-900 flex flex-col text-start">
                              {music.title}
                              <Badge className="w-10 flex items-center justify-center">
                                {steps.find((step) => step.musicId === music.id)?.musicTone}
                              </Badge>
                            </span>
                          </Card.Content>
                        </DialogTrigger>
                        <DialogContent className="rounded-xl">
                          <DialogHeader>
                            <DialogTitle>{music.title}</DialogTitle>
                            <DialogDescription>{music.artist}</DialogDescription>
                          </DialogHeader>
                          <MusicView id={music.id} />
                        </DialogContent>
                      </Dialog>
                    </Card>
                  ))}
              </div>
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
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </main>
  )
}
