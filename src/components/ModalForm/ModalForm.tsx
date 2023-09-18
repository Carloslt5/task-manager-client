import { ReactNode } from 'react'

const ModalForm = ({ children }: { children: ReactNode }) => {
  return (
    < div className='fixed inset-0 top-0 left-0 right-0 z-10 flex items-center justify-center max-w-full max-h-full p-2 overflow-x-hidden overflow-y-auto bg-opacity-50 bg-slate-900 dark:bg-zinc-800 dark:bg-opacity-50'>

      {children}

    </div>
  )
}

export default ModalForm