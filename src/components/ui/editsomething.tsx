import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
const Editsomething = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que pretende Actualizar?</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input />
          </div>
          <div>
            <Button type="button" className="cursor-pointer">
              Actualizar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Editsomething;
