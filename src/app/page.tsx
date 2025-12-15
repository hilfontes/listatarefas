"use client";
import Mensagemsn from "@/components/mensagem-s-n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Editsomething from "@/components/ui/editsomething";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { getTasks } from "@/actions/get-tasks-from-db";
import {
  SquarePlus,
  Trash,
  ListCheck,
  Sigma,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Tasks } from "@prisma/client";
import { NewTask } from "@/actions/add-tasks";
import { deleteTask } from "@/actions/delete-tasks";
import { toast } from "sonner";
import { updateTaskStatus } from "@/actions/toggle-done";
import Filter, { FilterType } from "@/components/ui/filter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCompleteTasks } from "@/actions/delete-competed-tasks";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();

      if (!tasks) return;
      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      if (task.length === 0 || !task) {
        toast.error("Insira uma tarefa");
        setLoading(false);
        return;
      }

      const recebeResult = await NewTask(task);

      if (!recebeResult) return;
      setTask("");
      toast.success("Tarefa foi adicionada com sucesso");
      await handleGetTasks();
      setLoading(false);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  const handleDeleteTask = async (idTask: string) => {
    try {
      if (idTask.length === 0 || !idTask) {
        return;
      }

      const recebeResult = await deleteTask(idTask);

      if (!recebeResult) return;

      toast.warning("Tarefa foi deletada");

      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTask = async (taskId: string) => {
    const previousTasks = [...taskList];

    try {
      setTaskList((prev) => {
        const updatedTaskList = prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });
        return updatedTaskList;
      });

      await updateTaskStatus(taskId);
    } catch (error) {
      setTaskList(previousTasks);
      throw error;
    }
  };

  const clearCompletedTasks = async () => {
    const deletedTasks = await deleteCompleteTasks();

    if (!deletedTasks) return;

    setTaskList(deletedTasks);
  };

  // useEffect executa a funcao handleGetTasks apos renderizacao do componente
  //[] significa q nao existe dependencia na execucao...se tivesse  valor irir executar sempre q este valor se alterasse
  useEffect(() => {
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList);
        break;
      case "pending":
        const pendingTasks = taskList.filter((task) => !task.done);
        setFilteredTasks(pendingTasks);
        break;
      case "completed":
        const completedTasks = taskList.filter((task) => task.done);
        setFilteredTasks(completedTasks);
    }
  }, [currentFilter, taskList]);

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar Tarefa"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button className="cursor-pointer" onClick={handleAddTask}>
            {" "}
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <SquarePlus />
            )}
            Adicionar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <div className="mt-4 border-b">
            {taskList.length === 0 && (
              <p className="text-xs border-t py-4">
                Nao possui tarefas cadastradas
              </p>
            )}
            {filteredTasks.map((task) => (
              <div
                className="h-14 flex justify-between items-center  border-t"
                key={task.id}
              >
                <div
                  className={`${
                    task.done
                      ? "w-1 h-full bg-green-300"
                      : "w-1 h-full bg-red-300"
                  }`}
                ></div>
                <p
                  className="flex-1 px-2 text-sm cursor-pointer  hover:text-gray-500"
                  onClick={() => handleToggleTask(task.id)}
                >
                  {task.task}
                </p>
                <div className="flex gap-4 items-center">
                  <Editsomething task={task} handleGetTasks={handleGetTasks} />

                  <Trash
                    size={16}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">
                tarefas concluidas (
                {taskList.filter((task) => task.done).length}/{taskList.length})
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 cursor-pointer"
                  variant="outline"
                >
                  <Trash /> Limpar tarefas concluidas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que pretende apagar as x tarefas?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className="cursor-pointer"
                    onClick={clearCompletedTasks}
                  >
                    Sim
                  </AlertDialogAction>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{
                width: `${
                  (taskList.filter((task) => task.done).length /
                    taskList.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">{taskList.length} tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
export default Home;
