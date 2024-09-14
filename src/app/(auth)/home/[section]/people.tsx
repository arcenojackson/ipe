import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
import { LucideUserRoundCog, User2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export function People() {
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
      const response = await fetch('/api/users')
      const result = await response.json()
      setUsers(result.data)
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

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-center gap-2 p-4 overflow-y-scroll">
        {isLoading && <Loading />}
        {users.map((user) => (
          <Card height="h-16" bgColor="bg-slate-800" key={user.id}>
            <Card.Icon bgColor="bg-purple-800">
              <User2 size={28} color="white" />
            </Card.Icon>
            <Card.Content>
              <span>{user.name}</span>
            </Card.Content>
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
