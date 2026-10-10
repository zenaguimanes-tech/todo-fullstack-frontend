import { useState } from 'react'

function AddTask({ onAdd }) {
    const [text, setText] = useState('')
    const [dueDate, setDueDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim() === '') { return }
        onAdd(text, dueDate)
        setText('')
    }

    return (
        <form className='flex gap-3 mb-6' onSubmit={handleSubmit}>
            <input className='px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none' type="text" placeholder='Enter a task' onChange={(e) => setText(e.target.value)} value={text} />
            <input className='w-36 shrink-0 px-2 py-3 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none' type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button className='bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition hover:scale-105 active:scale-95' type="submit">Add</button>
        </form>
    )
}

export default AddTask