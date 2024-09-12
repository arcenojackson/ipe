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

type HomeProps = {
  params: { section: Section }
}

export default function Home({ params }: HomeProps) {
  const router = useRouter()
  const cookies = useCookies()
  const user = JSON.parse(cookies.get('user') ?? '{}')
  const [section, setSection] = useState<Section>(params.section ?? 'agenda')

  if (!user?.email) router.replace('/')

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
    <main className="w-full h-screen flex flex-col">
      <header className="w-full h-52 flex flex-col items-center gap-4 py-4 bg-slate-800 text-slate-100">
        <Image alt="Logo da igreja presbiteriana do estreito" src={Logo} height={80} />
        <div className="flex gap-2">
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
          <Button variant="destructive" onClick={logout}>
            <LogOut size={18} />
          </Button>
        </div>
        <span className="text-lg">{pageView[section]}</span>
      </header>
      <section className="w-full flex flex-1 bg-slate-500">
        <Show>
          <Show.When isTrue={section === 'agenda'}>
            <Agenda currentUser={user} />
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
      </section>
    </main>
  )
}
