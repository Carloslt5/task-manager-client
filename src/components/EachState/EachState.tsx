import { IState } from '../../types/State.type'

const EachState: React.FC<IState> = ({ _id, stateName }) => {
  return (
    <div className='mb-4' >
      <h2 className='p-1 font-bold 2xl'>{stateName}</h2>
      <p>{_id}</p>
      <hr />
    </div>
  )
}

export default EachState