import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Tasks } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/actions/edit-task";

type TaskProps = {
  task: Tasks;
  handleGetTasks: () => void;
};

const Editsomething = ({ task, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState(task.task);

  const handleEditTask = async () => {
    try {
      if (editedTask !== task.task) {
        toast.success("pode actualizar");
      } else {
        toast.error("mesmos dados");
      }
      await editTask({
        idTask: task.id,
        newTask: editedTask,
      });

      handleGetTasks();
    } catch (error) {
      throw error;
    }
  };
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
            <Input
              placeholder="Editar Tarefa"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
          </div>
          <div>
            <DialogClose asChild>
              <Button
                type="button"
                className="cursor-pointer"
                onClick={handleEditTask}
              >
                Actualizar
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Editsomething;
