'use client'

import { Show } from '@/components/show'
import { Button } from '@/components/ui/button'
import { CalendarCheck, CalendarCogIcon, LogOut, Music, Users } from 'lucide-react'
import { useCookies } from 'next-client-cookies'
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

  return (
    <main className="w-full h-screen">
      <header className="w-full h-60 flex flex-col items-center justify-center gap-4 bg-slate-800">
        <h1 className="text-xl text-slate-100 font-bold">Igreja Presbiteriana do Estreito</h1>
        <h3 className="text-base text-slate-300 font-regular">Olá {user.name}!</h3>
        <div className="flex gap-4 mt-4">
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
      </header>
      <Show>
        <Show.When isTrue={section === 'agenda'}>
          <Agenda />
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
    </main>
  )
}
