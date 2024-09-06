import { Edit, Music, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music as MusicComponent } from "@/components/ui/music";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Musics() {
  function onAddMusic() {}

  return (
    <section className="w-full flex flex-col gap-8 p-4">
      <h3 className="text-xl font-bold">MÚSICAS</h3>
      <div className="w-full h-[500px] p-4 flex flex-col gap-4 rounded-lg bg-slate-700 overflow-y-scroll">
        {/* <Card>
          <Card.Icon bgColor="bg-purple-800">
            <Music size={28} color="white" />
          </Card.Icon>
          <Card.Content>
            <span>A Alegria do Senhor</span>
            <span></span>
            <span className="text-xs text-slate-300">Fernandinho</span>
          </Card.Content>
          <Card.Actions>
            <Dialog>
              <DialogTrigger>
                <Button variant="ghost">
                  <Edit size={30} color="white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-xl">
                <DialogHeader>
                  <DialogTitle>Editar música</DialogTitle>
                </DialogHeader>
                <MusicComponent id="123" />
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="ghost">
              <Trash2 size={30} color="red" />
            </Button>
          </Card.Actions>
        </Card> */}
      </div>
      <Dialog>
        <DialogTrigger>
          <Button className="w-full h-12">
            <PlusCircle className="mr-4" />
            Adicionar música
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Nova música</DialogTitle>
          </DialogHeader>
          <MusicComponent />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
