import { IState } from '../../types/State.type'

const EachState: React.FC<IState> = ({ stateName }) => {
  return (
    <>
      <h2 className='p-1 font-bold 2xl'>{stateName}</h2>
      <hr />
    </>
  )
}

export default EachState