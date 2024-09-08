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
import { Loading } from '@/components/ui/loading'
import { useToast } from '@/hooks/use-toast'
import { User } from '@/types/user'
import { Trash2, User2 } from 'lucide-react'
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
    <section className="w-full flex flex-col gap-4 p-4">
      <h3 className="text-xl font-bold">PESSOAS</h3>
      <div className="w-full h-[500px] p-4 flex flex-col items-center gap-4 rounded-lg bg-slate-700 overflow-y-scroll">
        {isLoading && <Loading />}
        {users.map((user) => (
          <Card height="h-24" key={user.id}>
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
    </section>
  )
}
