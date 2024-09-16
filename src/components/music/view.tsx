import { toast } from '@/hooks/use-toast'
import { Music } from '@/types/music'
import { CornerUpLeft, ExternalLink, Fullscreen } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button'

type PlayingProps = {
  id?: string
}

export function MusicView({ id }: PlayingProps) {
  const [music, setMusic] = useState<Music | null>(null)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    if (!id) return
    ;(async () => await loadMusic())()
  }, [])

  const loadMusic = useCallback(async () => {
    try {
      const response = await fetch(`/api/musics/${id}`)
      const result = await response.json()
      if (response.status !== 200) {
        toast({
          title: 'Música',
          description: result.message,
          duration: 3000,
          variant: 'destructive'
        })
        return
      }
      setMusic(result.data)
    } catch (error) {
      console.log(error)
    }
  }, [id])

  return (
    <section
      className={`flex flex-col gap-4 ${fullscreen ? 'h-screen' : 'h-[calc(100vh-300px)]'} border-b overflow-hidden p-4`}
    >
      <div className="grid grid-cols-2">
        <span className="font-bold">
          Versão:
          <a href={music?.youtube} target="_blank" rel="noopener noreferrer">
            <p className="flex font-normal text-sky-700 gap-2">
              YouTube <ExternalLink size={20} />
            </p>
          </a>
        </span>
        <span className="font-bold">
          Cifra:
          <a href={music?.cipher} target="_blank" rel="noopener noreferrer">
            <p className="flex font-normal text-sky-700 gap-2">
              Cifra Club <ExternalLink size={20} />
            </p>
          </a>
        </span>
      </div>
      <span className="font-bold flex gap-4 items-center">
        Letra:
        <Button className="w-36 flex gap-4" onClick={() => setFullscreen(!fullscreen)}>
          <Fullscreen />
          {fullscreen ? 'Voltar' : 'Tela cheia'}
        </Button>
      </span>
      <div
        className={`flex flex-col gap-2 ${fullscreen ? 'absolute top-16 left-0 bottom-0 w-full p-4 z-50 bg-white' : ''}`}
      >
        {fullscreen && (
          <Button className="w-36 flex gap-4" onClick={() => setFullscreen(!fullscreen)}>
            <CornerUpLeft />
            Voltar
          </Button>
        )}
        {music?.lyrics && (
          <textarea
            disabled
            rows={fullscreen ? 24 : 17}
            className="resize-none bg-slate-100 rounded-lg pl-2"
          >
            {music.lyrics}
          </textarea>
        )}
      </div>
    </section>
  )
}
