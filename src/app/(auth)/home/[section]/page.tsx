'use client'

import Logo from '@/app/assets/logo.png'
import { Show } from '@/components/show'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CalendarCheck, CalendarCogIcon, LogOut, Music, Users } from 'lucide-react'
import { useCookies } from 'next-client-cookies'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Agenda } from './agenda'
import { Musics } from './musics'
import { People } from './people'
import { Planning } from './planning'

type Section = 'agenda' | 'planning' | 'people' | 'music'

type HomeProps = {
  params: { section: Section }
}

export default function Home({ params }: HomeProps) {
  const router = useRouter()
  const cookies = useCookies()
  const user = JSON.parse(cookies.get('user') ?? '{}')
  const [section, setSection] = useState<Section>(params.section ?? 'agenda')
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  if (!user?.email) router.replace('/')

  function logout() {
    cookies.remove('user')
    router.replace('/')
  }

  const pageView = {
    agenda: 'Esta é sua agenda',
    planning: 'Vamos planejar?',
    people: 'Aqui estão seus irmãos',
    music: 'Este é o nosso repertório'
  }

  return (
    <main className="w-full h-screen flex flex-col">
      <header className="w-full h-32 flex items-center justify-center py-4 px-8 bg-slate-800 text-slate-100">
        <Image alt="Logo da igreja presbiteriana do estreito" src={Logo} height={100} />
        <div className="flex flex-col flex-1 gap-2 items-center justify-center">
          <span className="text-lg">{`Olá ${user.name}!`}</span>
          <span>{pageView[section]}</span>
        </div>
        <button onClick={handleClick} className="flex flex-col justify-center items-center">
          <span
            className={`bg-slate-100 block transition-all duration-300 ease-out 
              h-1 w-8 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}
          ></span>
          <span
            className={`bg-slate-100 block transition-all duration-300 ease-out 
              h-1 w-8 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          ></span>
          <span
            className={`bg-slate-100 block transition-all duration-300 ease-out 
              h-1 w-8 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}
          ></span>
        </button>
      </header>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-56 flex flex-col justify-between bg-slate-600 text-slate-50"
        >
          <div className="flex flex-col gap-2 mt-12">
            <Button
              className="w-full grid grid-cols-5"
              onClick={() => {
                setSection('agenda')
                handleClick()
              }}
              variant={section === 'agenda' ? 'default' : 'secondary'}
            >
              <CalendarCheck size={18} />
              Sua agenda
            </Button>
            <Button
              className="w-full grid grid-cols-5"
              onClick={() => {
                setSection('planning')
                handleClick()
              }}
              variant={section === 'planning' ? 'default' : 'secondary'}
            >
              <CalendarCogIcon size={18} />
              Planejar
            </Button>
            <Button
              className="w-full grid grid-cols-5"
              onClick={() => {
                setSection('people')
                handleClick()
              }}
              variant={section === 'people' ? 'default' : 'secondary'}
            >
              <Users size={18} />
              Pessoas
            </Button>
            <Button
              className="w-full grid grid-cols-5"
              onClick={() => {
                setSection('music')
                handleClick()
              }}
              variant={section === 'music' ? 'default' : 'secondary'}
            >
              <Music size={18} />
              Músicas
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <Button className="w-full grid grid-cols-5" variant="destructive" onClick={logout}>
              <LogOut size={18} />
              Sair
            </Button>
            <span className="text-sm">
              Versão: {process.env.NEXT_PUBLIC_APP_VERSION ?? '1.0.0'}
            </span>
          </div>
        </SheetContent>
      </Sheet>
      <section className="w-full flex flex-1 bg-slate-500">
        <Show>
          <Show.When isTrue={section === 'agenda'}>
            <Agenda currentUser={user} />
          </Show.When>
          <Show.When isTrue={section === 'planning'}>
            <Planning />
          </Show.When>
          <Show.When isTrue={section === 'people'}>
            <People />
          </Show.When>
          <Show.When isTrue={section === 'music'}>
            <Musics />
          </Show.When>
        </Show>
      </section>
    </main>
  )
}
