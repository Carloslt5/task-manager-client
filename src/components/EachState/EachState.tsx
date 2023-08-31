import { IState } from '../../types/State.type'

const EachState: React.FC<IState> = ({ stateName }) => {
  return (
    <>
      <h1>{stateName}</h1>
      <hr className='my-2' />
    </>
  )
}

export default EachState