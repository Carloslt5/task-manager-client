import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authservices from '@/services/auth.services'
import { AuthContext } from '@/contexts/auth.context'
import { AuthContextType } from '@/contexts/Types/AuthContext.types'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { ValidationError } from '../components/SignupForm/SignupForm'
import { toast } from 'react-toastify'

type LoginData = {
  email: string
  password: string
}

export const useLogin = () => {
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const { register, handleSubmit } = loginForm
  const [loginErrors, setLoginErrors] = useState<ValidationError[]>([])

  const { storeToken, authenticateUser } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  const submitHandler = async (loginData: LoginData) => {
    try {
      const { data } = await authservices.login(loginData)
      storeToken(data.authToken)
      authenticateUser()
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 401) {
          toast.error(error.response.data.message)
        }
        setLoginErrors(error.response?.data)
      }
    }
  }
  return {
    register, handleSubmit, loginErrors, submitHandler
  }
}