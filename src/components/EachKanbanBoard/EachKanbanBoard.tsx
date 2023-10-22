import { ProjectData } from '@/types/Project.type'

const EachKanbanBoard: React.FC<ProjectData> = ({ title }) => {
  return (
    <article className='flex items-center justify-center h-32 card-primary'>
      <h2>{title}</h2>
    </article>
  )
}

export default EachKanbanBoard