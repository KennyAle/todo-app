import React, { useEffect, useState, useRef } from 'react'

function TodoList({ listName, onListRemove }) {
    const [tasksList, setTasksList] = useState(JSON.parse(localStorage.getItem(`storedTasks_${listName}`)) || [{ task: "" }])
    const inputRefs = useRef([])

    useEffect(() => {
        localStorage.setItem(`storedTasks_${listName}`, JSON.stringify(tasksList))
    }, [listName, tasksList])

    // function handleTaskAdd() {
    //     setTasksList([...tasksList, { task: "" }])
    // }

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
                const newTaskList = [...tasksList, { task: "" }]
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
            const newTaskList = [...tasksList, { task: "" }]
            setTasksList(newTaskList)
        }
    }

    function handleListRemove() {
        onListRemove(listName)
    }

    return (
        <div className='relative rounded-md max-w-sm min-w-72 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
            <svg
                onClick={handleListRemove}
                className="absolute right-0 m-1 w-5 h-5 text-slate-400 hover:text-slate-200 hover:transition-all cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            <span className='sr-only'>Delete list button</span>
            <div className="flex flex-col gap-4 p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{listName}</h1>
                <form onKeyDown={handleKeyDown} onBlur={handleBlur}>
                    <div className="relative flex flex-col gap-4">
                        {tasksList.map((task, index) => (
                            <div className='relative' key={index}>
                                <input
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    id="task"
                                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter New Task"
                                    value={task.task}
                                    onChange={(e) => handleTaskEdit(e, index)}
                                    onBlur={handleBlur}
                                    /*onKeyDown={index === tasksList.length - 1 ? handleKeyDown: null}*/ />
                                {index !== tasksList.length - 1 &&
                                    <button
                                        onClick={() => handleTaskRemove(index)}
                                        type="button"
                                        className="text-slate-400 hover:text-slate-200 hover:transition-all absolute end-0.5 bottom-2.5   font-medium rounded-lg text-sm px-2 py-2">
                                        <svg className="opacity-60 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg>
                                        <span className="sr-only">Delete button</span>
                                    </button>
                                }
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TodoList;
