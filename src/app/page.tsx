import Mensagemsn from "@/components/mensagem-s-n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Editsomething from "@/components/ui/editsomething";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  List,
  SquarePlus,
  ShieldCheck,
  Pen,
  SquarePen,
  Trash,
  ListCheck,
  Sigma,
} from "lucide-react";

const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar Tarefa" />
          <Button className="cursor-pointer">
            {" "}
            <SquarePlus />
            Adicionar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />
          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant="default">
              <List />
              Todas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <Pen />
              Nao FInalizadas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <ShieldCheck />
              Concluidas
            </Badge>
          </div>

          <div className="mt-4 border-b">
            <div className="h-14 flex justify-between items-center  border-t">
              <div className="w-1 h-full bg-green-300"></div>
              <p className="flex-1 px-2 text-sm">Estudar React</p>
              <div className="flex gap-4 items-center">
                <Editsomething />

                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">tarefas concluidas 3/3</p>
            </div>

            <Mensagemsn />
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>
          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">3 tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
export default Home;
