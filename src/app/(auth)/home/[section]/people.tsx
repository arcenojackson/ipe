import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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
import { LucideUserRoundCog, Trash2, User2 } from 'lucide-react'
import { useEffect, useState } from 'react'

type PeopleProps = {
  currentUser: Partial<User>
}

export function People({ currentUser }: PeopleProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const { toast } = useToast()

  useEffect(() => {
    ;(async () => await loadData())()
  }, [])

  async function loadData() {
    try {
      const response = await fetch('/api/users')
      const result = await response.json()
      setUsers(result.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast({
        title: 'Usuários',
        description: 'Erro ao listar usuários',
        variant: 'destructive'
      })
    }
  }

  async function onDeleteUser(id: string) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    setIsLoading(true)
    await loadData()
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-center gap-4 p-4 overflow-y-scroll">
        {isLoading && <Loading />}
        {users.map((user) => (
          <Card height="h-24" bgColor="bg-slate-800" key={user.id}>
            <Card.Icon bgColor="bg-purple-800">
              <User2 size={28} color="white" />
            </Card.Icon>
            <Card.Content>
              <span>{user.name}</span>
            </Card.Content>
            {user.email !== currentUser.email && (
              <Card.Actions>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 size={30} color="red" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deseja mesmo excluir este usuário?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não poderá ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteUser(user.id!)}>
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Card.Actions>
            )}
          </Card>
        ))}
      </div>
      <Sheet>
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
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
