import TaskItem from "./TaskItem"

function TaskList({ tasks, onToggle, onDelete, onEdit }) {

    return (
        <ul className="space-y-2">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={onEdit} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ul>
    )
}

export default TaskList