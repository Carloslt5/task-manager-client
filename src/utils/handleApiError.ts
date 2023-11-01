
export function handleApiError(error) {
  if (error.response && error.response.status === 401) {
    return {
      message: error.response.data.message,
    }
  }
}
