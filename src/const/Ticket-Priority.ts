export const TICKET_PRIORITY = ['Low', 'Medium', 'High']

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'High':
      return 'bg-red-500'
    case 'Medium':
      return 'bg-orange-500'
    case 'Low':
      return 'bg-yellow-500'
    default:
      return 'bg-yellow-500'
  }
}