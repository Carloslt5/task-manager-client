import { MdPostAdd } from 'react-icons/md'
import CanvasCards from '../CanvasCards/CanvasCards'

const Board = () => {
  return (
    <div className='shadow appearance-none border rounded w-100 my-4 py-2 px-2 text-gray-700 leading-tight'>
      <div className='cardTitle mb-2 border-b flex justify-between items-center'>
        <h1 className=' text-2xl'>Board</h1>
        <button className='flex gap-2 items-center text-xs border py-1 px-2'>
          <MdPostAdd />
          <span>Add Card</span>
        </button>
      </div>
      <div className='content flex gap-2'>
        <CanvasCards />
        <CanvasCards />
        <CanvasCards />
      </div>
    </div>
  )
}

export default Board