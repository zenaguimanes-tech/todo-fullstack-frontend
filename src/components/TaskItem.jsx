import { useState } from "react"

function TaskItem({ task, onToggle, onDelete, onEdit }) {

    const [isEditing, setIsEditing] = useState(false)
    const [newText, setNewText] = useState(task.text)
    const [isDeleting, setIsDeleting] = useState(false)

    return (
        <li onClick={() => onToggle(task.id)} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition animate-[slideIn_0.3s_ease] hover:scale-[1.02] hover:shadow-md ${task.done ? 'bg-green-100' : 'bg-gray-50 hover:bg-gray-100'} ${isDeleting ? 'animate-[slideOut_0.3s_ease]' : ''}`}>
            {isEditing ? 
                (<input type="text"
                    className="focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { if (newText !== task.text) {onEdit(task.id, newText);} setIsEditing(false) } }}
                    onBlur={() => {  if (newText !== task.text) {onEdit(task.id, newText);} setIsEditing(false) }}
                    autoFocus/>) : 
                ( <div className="flex-1">
                    <span className={`text-gray-800 ${task.done ? 'line-through opacity-60' : ''}`} 
                        onDoubleClick={(e) => { 
                            e.stopPropagation() 
                            setIsEditing(true)}}
                        onClick={(e) => e.stopPropagation()}>
                    {task.text}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                        <span>created at: {new Date(task.created_at).toLocaleDateString()}</span>
                        {task.due_date && (
                            <span className="ml-2">Due 📅 : {new Date(task.due_date).toLocaleDateString()}</span>
                        )}
                    </div>
                </div>)
            }
            <button onClick={(e) => {
                e.stopPropagation()
                setIsDeleting(true)
                setTimeout(() => {
                    onDelete(task.id)
                }, 300)
            }}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition hover:scale-110 hover:rotate-12">
                🗑️
            </button>
        </li>
    )
}

export default TaskItem