import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Loading } from '@/components/ui/loading'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
import { User } from '@/types/user'
import { DialogContent } from '@radix-ui/react-dialog'
import { LucideUserRoundCog, Settings, User2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type PeopleProps = {
  currentUser: Partial<User>
}

export function People({ currentUser }: PeopleProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const { toast } = useToast()

  useEffect(() => {
    ;(async () => await loadData())()
  }, [])

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/musics')
      const result = await response.json()
      setUsers(result.users)
      setIsLoading(false)
      setIsOpen(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast({
        title: 'Usuários',
        description: 'Erro ao listar usuários',
        variant: 'destructive'
      })
    }
  }, [])

  async function handleTurnToAdm(id: string, is_admin: boolean) {
    setIsLoading(true)
    try {
      await fetch(`/api/people/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ is_admin })
      })
      await loadData()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col h-[calc(100vh-300px)] items-center gap-2 mt-4 px-4 overflow-y-auto">
        {isLoading && <Loading />}
        {users.map((user) => (
          <Card height="h-16" bgColor="bg-slate-800" key={user.id}>
            <Card.Icon bgColor="bg-purple-800">
              <User2 size={28} color="white" />
            </Card.Icon>
            <Card.Content>
              <span>{user.name}</span>
            </Card.Content>
            {currentUser.is_admin && (
              <Card.Actions>
                <Sheet>
                  <SheetTrigger className="w-full flex">
                    <Settings color="white" />
                  </SheetTrigger>
                  <SheetContent side="bottom" className="rounded-xl">
                    <SheetHeader>
                      <span>Opções de usuário</span>
                    </SheetHeader>
                    <div className="w-full h-20 flex items-center justify-center">
                      {!user.is_admin ? (
                        <Button onClick={() => handleTurnToAdm(user.id, true)}>
                          Tornar administrador
                        </Button>
                      ) : (
                        <Button onClick={() => handleTurnToAdm(user.id, false)}>
                          Remover administrador do usuário
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </Card.Actions>
            )}
          </Card>
        ))}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="w-full p-4">
          <div className="h-12 flex items-center justify-center bg-slate-950 rounded-lg text-slate-200">
            <LucideUserRoundCog className="mr-4" />
            Gerenciar equipes
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-xl h-40 mx-4">
          <SheetHeader>
            <SheetTitle>Futuras funcionalidades</SheetTitle>
            <SheetDescription>Aguarde...</SheetDescription>
          </SheetHeader>
          <Button onClick={loadData}>Carregar usuários</Button>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
