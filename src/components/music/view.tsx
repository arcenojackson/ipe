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
  const [fullscreen, setFullscreen] = useState<'cipher' | 'lyrics' | ''>('')

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
      className={`flex flex-col items-center gap-4 ${fullscreen ? 'h-screen' : 'h-[calc(100vh-300px)]'} border-b overflow-hidden p-4`}
    >
      <iframe
        className="w-full aspect-video self-stretch min-h-52 md:min-h-60 rounded-lg shadow-sm"
        src={music?.youtube}
        title={music?.title}
        aria-hidden="true"
      />
      <div className="w-full grid grid-cols-2 place-items-center mt-4">
        <Button className="w-36 flex gap-4" onClick={() => setFullscreen('lyrics')}>
          <Fullscreen />
          Letra
        </Button>
        <a href={music?.cipher} target="_blank" rel="noopener noreferrer">
          <Button className="w-36 flex gap-4">
            <Fullscreen />
            Cifra
          </Button>
        </a>
      </div>
      {fullscreen !== '' &&
        FullScreen(fullscreen === 'cipher' ? music?.cipher! : music?.lyrics!, () =>
          setFullscreen('')
        )}
    </section>
  )
}

const FullScreen = (text: string, close: () => void) => (
  <div className="absolute top-14 left-0 w-full h-screen overflow-auto px-4 py-8 z-50 bg-white">
    <Button className="w-full flex gap-4" onClick={close}>
      <CornerUpLeft />
      Voltar
    </Button>
    <pre className="overflow-auto mb-8 text-lg font-bold text-wrap rounded bg-slate-100">
      {text}
    </pre>
  </div>
)
