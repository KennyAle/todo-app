import React, { useEffect, useState } from 'react'

function TodoList({ listName, tasks }) {
    const [tasksList, setTasksList] = useState(JSON.parse(localStorage.getItem(`storedTasks_${listName}`)) || [{ task: "" }])

    useEffect(() => {
        localStorage.setItem(`storedTasks_${listName}`, JSON.stringify(tasksList))
    }, [listName, tasksList])

    function handleTaskAdd() {
        setTasksList([...tasksList, { task: "" }])
    }

    function handleTaskRemove(index) {
        const newTasks = [...tasksList]
        newTasks.splice(index, 1)
        setTasksList(newTasks)
    }

    function handleTaskEdit(e, index) {
        const { value } = e.target
        const newTasks = [...tasksList]
        newTasks[index].task = value
        setTasksList(newTasks)
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault()
            handleTaskAdd()
        }
    }

    return (
        <div className='rounded-md max-w-sm min-w-72 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
            <div className="flex flex-col gap-4 p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{listName}</h1>
                <form>
                    <div className="relative flex flex-col gap-4">
                        {tasksList.map((task, index) => (
                            <div className='relative' key={index}>
                                <input type="text"
                                    id="task"
                                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter New Task"
                                    value={task.task}
                                    onChange={(e) => handleTaskEdit(e, index)}
                                    onKeyDown={index === tasksList.length - 1 ? handleKeyDown : null} />
                                {index !== tasksList.length - 1 &&
                                    <button
                                        onClick={() => handleTaskRemove(index)}
                                        type="button"
                                        className="text-slate-400 hover:text-slate-200 hover:transition-all absolute end-0.5 bottom-2.5   font-medium rounded-lg text-sm px-2 py-2">
                                        <svg className="w-6 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18 17.94 6M18 18 6.06 6" />
                                        </svg>
                                        <span className="sr-only">Delete button</span>
                                    </button>
                                }
                            </div>
                        ))}
                        <button onClick={handleTaskAdd} type="button" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TodoList;
