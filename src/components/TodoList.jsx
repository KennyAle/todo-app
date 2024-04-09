import React, { useEffect, useState, useRef } from 'react'
import TaskItem from './TaskItem'

function TodoList({ listName, onListRemove }) {
    const [tasksList, setTasksList] = useState(JSON.parse(localStorage.getItem(`storedTasks_${listName}`)) || [{ task: "" }])
    const inputRefs = useRef([])

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

    return (
        <div className='relative rounded-md max-w-sm min-w-72 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
            <div className="w-full bg-gray-200 rounded-t-md h-2.5 dark:bg-gray-700">
                <div className="bg-emerald-600 h-2.5 rounded-full w-[70%]" /*style="width: 45%"*/></div>
            </div>
            <svg
                onClick={handleListRemove}
                className="absolute right-0 m-1 w-5 h-7 text-slate-400 hover:text-slate-200 hover:transition-all cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            <span className='sr-only'>Delete list button</span>
            <svg className="absolute right-7 m-1 w-5 h-7 text-slate-400 hover:text-slate-200 hover:transition-all cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 11.5h13m-13 0V18a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-6.5m-13 0V9a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v2.5M9 5h11a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1" />
            </svg>
            <div className="flex flex-col gap-4 p-5 mb-4 border border-gray-100 rounded-b-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-sm text-slate-400">04/06/2024</h2>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{listName}</h1>
                <form onKeyDown={handleKeyDown} onBlur={handleBlur}>
                    <div className="relative flex flex-col gap-4">
                        {tasksList.map((task, index) => (
                            <TaskItem
                                inputRefs={inputRefs}
                                tasksList={tasksList}
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
