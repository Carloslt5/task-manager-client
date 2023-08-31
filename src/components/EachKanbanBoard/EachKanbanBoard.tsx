import { ProjectData } from '../../types/Project.type'

const EachKanbanBoard: React.FC<ProjectData> = ({ title }) => {
  return (
    <article className='flex items-center justify-center h-32 p-4 text-white bg-gray-800 border rounded hover:bg-gradient-to-b from-emerald-500 to-emerald-900'>
      <h2>{title}</h2>
    </article>
  )
}

export default EachKanbanBoard