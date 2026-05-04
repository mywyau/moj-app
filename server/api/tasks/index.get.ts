import { getTasks } from './_mock-store'

export default defineEventHandler(() => {
  return { tasks: getTasks() }
})
