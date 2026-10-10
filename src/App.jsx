import AddTask from "./components/AddTask"
import TaskList from "./components/TaskList"
import { useState } from "react"
import { useEffect } from "react"
import './App.css'
import axios from 'axios'

function App() {

  const [tasks, setTasks] = useState([])
  const API_URL = import.meta.env.VITE_API_URL || 'https://todo-fullstack-backend-9gf7.onrender.com/api/tasks'
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => {
        console.error(error)
        setError('An Error ..')
      })
  }, [])

  const addTask = (text, dueDate) => {
    axios.post(API_URL, { text: text, due_date: dueDate })
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => {
        console.error(error)
        setError('An Error ...')
      })
  }

  const toggleTask = (id) => {
    axios.put(API_URL + '/' + id, {})
    .then(response => {
      setTasks(tasks.map(task =>
        task.id === id ? response.data : task
      ))
    })
    .catch(error => {
      console.error(error)
      setError('An Error ...')
    })
  }

  const deleteTask = (id) => {
    axios.delete(API_URL + '/' + id)
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id))
    })
    .catch(error => {
      console.error(error)
      setError('An Error ...')
    })
  }

  const notDone = tasks.filter(task => !task.done).length

  const [filter, setFilter] = useState('all')

  let filteredTasks = tasks

  if (filter === 'active') {filteredTasks = tasks.filter(task => !task.done)}
  else if (filter === 'done') {filteredTasks = tasks.filter(task => task.done)}

  const editTask= (id, newText) => {
    axios.put(API_URL + '/' + id, { text: newText })
    .then(response => {
      setTasks(tasks.map(task => task.id === id ? response.data : task))
    })
    .catch(error => {
      console.error(error)
      setError('An Error ...')
    })
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">To-Do List</h1>
      <AddTask onAdd={addTask} />
      <div className="flex gap-2 m-4">
        <button className={`flex-1 py-2 rounded-xl transition ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={() => setFilter('all')}>All</button>
        <button className={`flex-1 py-2 rounded-xl transition ${filter === 'done' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={() => setFilter('done')}>Done</button>
        <button className={`flex-1 py-2 rounded-xl transition ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={() => setFilter('active')}>Active</button>
      </div>
      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
      <div className="text-center text-sm text-gray-600 mt-4 animate-[fadeIn_0.5s_ease]">{notDone} Tasks not done</div>
      {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 flex justify-between items-center">
              <span>{error}</span>
              <button onClick={() => setError('')} className="font-bold">✕</button>
          </div>
      )}
    </div>
  )
}

export default App