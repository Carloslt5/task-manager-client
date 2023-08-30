import { ProjectData } from '../../types/Project.type'

const EachKanbanBoard: React.FC<ProjectData> = ({ title }) => {
  return (
    <article className='flex rounded border p-2 justify-between items-center' >
      <h2>{title}</h2>
    </article>
  )
}

export default EachKanbanBoard