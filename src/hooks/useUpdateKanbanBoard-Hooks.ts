import { KanbanContext, KanbanContextType } from '@/contexts/kanban.context'
import { EditedContent } from '@/contexts/ticket.context'
import kanbanservices from '@/services/kanban.services'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const useUpdateKanbanHooks = () => {

  const { kanbanBoardId } = useParams()
  const { kanbanBoardData, loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  useEffect(() => {
    if (kanbanBoardId) {
      loadKanbanBoard(kanbanBoardId)
    }
  }, [kanbanBoardId, loadKanbanBoard])

  const updateKanbantTitle = async (kanbanBoardId: string, kanbanTitleData: EditedContent): Promise<void> => {
    await kanbanservices.updateKanbanBoard(kanbanBoardId, kanbanTitleData)
  }

  return {
    kanbanBoardId,
    kanbanBoardData,
    loadKanbanBoard,
    updateKanbantTitle
  }
}