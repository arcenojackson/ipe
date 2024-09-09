'use client'

import Logo from '@/app/assets/logo.png'
import { Show } from '@/components/show'
import { Button } from '@/components/ui/button'
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

export default function Home() {
  const router = useRouter()
  const cookies = useCookies()
  const user = JSON.parse(cookies.get('user') ?? '{}')
  const [section, setSection] = useState<Section>('agenda')

  if (!user?.email) return

  function logout() {
    cookies.remove('user')
    router.replace('/')
  }

  const pageView = {
    agenda: 'AGENDA',
    planning: 'PLANEJAR',
    people: 'PESSOAS',
    music: 'MÚSICAS'
  }

  return (
    <main className="w-full h-screen">
      <header className="w-full h-60 flex items-center justify-around bg-slate-800">
        <Image alt="Logo da igreja presbiteriana do estreito" src={Logo} height={100} />
        <div className="flex flex-col items-center justify-center gap-6 text-slate-100">
          <h1 className="text-xl">Olá {user.name}!</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setSection('agenda')}
              variant={section === 'agenda' ? 'default' : 'secondary'}
            >
              <CalendarCheck size={18} />
            </Button>
            <Button
              onClick={() => setSection('planning')}
              variant={section === 'planning' ? 'default' : 'secondary'}
            >
              <CalendarCogIcon size={18} />
            </Button>
            <Button
              onClick={() => setSection('people')}
              variant={section === 'people' ? 'default' : 'secondary'}
            >
              <Users size={18} />
            </Button>
            <Button
              onClick={() => setSection('music')}
              variant={section === 'music' ? 'default' : 'secondary'}
            >
              <Music size={18} />
            </Button>
            <Button variant="secondary" onClick={logout}>
              <LogOut size={18} />
            </Button>
          </div>
          <span className="text-xl">{pageView[section]}</span>
        </div>
      </header>
      <Show>
        <Show.When isTrue={section === 'agenda'}>
          <Agenda />
        </Show.When>
        <Show.When isTrue={section === 'planning'}>
          <Planning />
        </Show.When>
        <Show.When isTrue={section === 'people'}>
          <People currentUser={user} />
        </Show.When>
        <Show.When isTrue={section === 'music'}>
          <Musics />
        </Show.When>
      </Show>
    </main>
  )
}
