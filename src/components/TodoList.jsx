import React, { useEffect, useState } from 'react'

function TodoList() {
    const [tasksList, setTasksList] = useState(JSON.parse (localStorage.getItem('storedTasks')) || [{ task: "" }])

    useEffect(() => {
        localStorage.setItem('storedTasks', JSON.stringify(tasksList))
    }, [tasksList])

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
        <div className='max-w-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
            <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Todo List</h1>
                <form>
                    <div className="relative">
                        {tasksList.map((task, index) => (
                            <div key={index}>
                                <input type="text"
                                id="task" 
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Enter New Task"
                                value={task.task} 
                                onChange={(e) => handleTaskEdit(e, index)} 
                                onKeyDown={index === tasksList.length -1 ? handleKeyDown : null}/>
                                {index !== tasksList.length - 1 &&
                                    <button 
                                    onClick={() => handleTaskRemove(index)} 
                                    type="button" 
                                    className="text-blue-700 border border-blue-900 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-900 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 bg-blue-500">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
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
