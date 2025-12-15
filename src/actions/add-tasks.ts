"use server"

import { prisma } from "@/utils/prisma"

export const NewTask = async (tarefa: string) => {
  try {
      if(!tarefa) return
    
    const novaTarefa = await prisma.tasks.create({
        data: {task:tarefa, done:false}

    }     
    )

    if(!novaTarefa) return // se nao criar retorna...para

    return novaTarefa
    
  } catch (error) {
    throw error
  }
}