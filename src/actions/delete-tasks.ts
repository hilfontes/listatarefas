"use server"

import { prisma } from "@/utils/prisma"

export const deleteTask = async (idTask: string) => {
  try {
      if(!idTask) return
    
    const tarefaDeletada = await prisma.tasks.delete({
        where: {id:idTask}

    }     
    )

    if(!tarefaDeletada) return // se nao deletar retorna...para

    return tarefaDeletada
    
  } catch (error) {
    throw error
  }
}