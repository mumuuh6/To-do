
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import TaskBoard from './componants/TaskBoard'
const queryClient = new QueryClient();
function App() {
  
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <h1>Task Management</h1>
      <TaskBoard></TaskBoard>
    </QueryClientProvider>
    </>
  )
}

export default App
