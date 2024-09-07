import { toast } from '@/hooks/use-toast'
import { Music } from '@/types/music'
import { ExternalLink } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import YouTube from 'react-youtube'

type PlayingProps = {
  id?: string
}

export function MusicView({ id }: PlayingProps) {
  const [music, setMusic] = useState<Music | null>(null)

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
    <section className="flex flex-col gap-4 h-[500px] border-b overflow-x-scroll p-4">
      <div className="grid grid-cols-2">
        <span className="font-bold">
          Versão:
          <a href={music?.youtube} target="_blank" rel="noopener noreferrer">
            <p className="flex font-normal text-sky-700 gap-2">
              YouTube <ExternalLink size={20} />
            </p>
          </a>
        </span>
        {/* {music?.youtube && (
          <div className="">
            <YouTube videoId="FnnmK-hOXEM" className="h-[200px]" />
          </div>
        )} */}
        <span className="font-bold">
          Cifra:
          <a href={music?.cipher} target="_blank" rel="noopener noreferrer">
            <p className="flex font-normal text-sky-700 gap-2">
              Cifra Club <ExternalLink size={20} />
            </p>
          </a>
        </span>
      </div>
      <span className="font-bold">Letra:</span>
      {music?.lyrics && (
        <textarea disabled rows={20} className="resize-none">
          {music.lyrics}
        </textarea>
      )}
    </section>
  )
}
