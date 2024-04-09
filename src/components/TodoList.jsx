import React, { useEffect, useState, useRef } from 'react'
import TaskItem from './TaskItem'

function TodoList({ listName, onListRemove }) {
    const [tasksList, setTasksList] = useState(JSON.parse(localStorage.getItem(`storedTasks_${listName}`)) || [{ task: "" }])
    const inputRefs = useRef([])
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        localStorage.setItem(`storedTasks_${listName}`, JSON.stringify(tasksList))
    }, [listName, tasksList])

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
            const index = tasksList.length - 1
            if (index === - 1 || tasksList[index].task.trim() !== '') {
                const newTaskList = [...tasksList, { id: Date.now(), task: "" }]
                setTasksList(newTaskList)
                setTimeout(() => {
                    inputRefs.current[index + 1].focus()
                }, 0)
            }
        }
    }

    function handleBlur() {
        const index = tasksList.length - 1
        if (index >= - 0 && tasksList[index].task.trim() !== '') {
            const newTaskList = [...tasksList, { id: Date.now(), task: "" }]
            setTasksList(newTaskList)
        }
    }

    function handleListRemove() {
        onListRemove(listName)
    }

    // Calculate completion percentage and set the width of the progress bar
    const completedTasksCount = tasksList.filter(task => task.isChecked && task.task.trim() !== '').length
    const totalTasksCount = tasksList.filter(task => task.task.trim() !== '').length
    const completionPercentage = totalTasksCount === 0 ? 0 : (completedTasksCount / totalTasksCount) * 100

    useEffect(() => {
        if (completionPercentage === 100) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }, [completionPercentage])

    return (
        <div className='relative rounded-md max-w-sm min-w-72 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
            <div className="w-full bg-gray-200 rounded-t-md h-2.5 dark:bg-gray-700">
                <div className={`${isCompleted ? 'animate-ping-once' : ''} bg-emerald-600 h-2.5 rounded-full transition-all`} style={{ width: `${completionPercentage}%` }}></div>
            </div>
            <svg
                onClick={handleListRemove}
                className="absolute right-0 m-1 w-5 h-7 text-slate-400 hover:text-slate-200 hover:transition-all cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            <span className='sr-only'>Delete list button</span>
            {/* <svg className="absolute right-7 m-1 w-5 h-7 text-slate-400 hover:text-slate-200 hover:transition-all cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd" />
            </svg>
            <span className='sr-only'>Edit list button</span> */}
            <div className="flex flex-col gap-4 p-5 mb-4 border border-gray-100 rounded-b-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-sm text-slate-400">04/06/2024</h2>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{listName}</h1>
                <form onKeyDown={handleKeyDown} onBlur={handleBlur}>
                    <div className="relative flex flex-col gap-4">
                        {tasksList.map((task, index) => (
                            <TaskItem
                                inputRefs={inputRefs}
                                tasksList={tasksList}
                                setTasksList={setTasksList}
                                key={index}
                                index={index}
                                task={task}
                                handleTaskEdit={handleTaskEdit}
                                handleTaskRemove={handleTaskRemove}
                                handleBlur={handleBlur} />
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TodoList;
