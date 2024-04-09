import React, { useState, useEffect } from "react";

function TaskItem({ tasksList, setTasksList, task, index, inputRefs, handleTaskEdit, handleTaskRemove, handleBlur }) {
    const [isChecked, setIsChecked] = useState(task.isChecked || false) 

    // Verify if the task is empty and set isChecked as false if it is
    useEffect(() => {
        if (task.task.trim() === "") {
            setIsChecked(false);
        }
    }, [task.task])

    useEffect(() => {
        localStorage.setItem(`task_${task.id}`, JSON.stringify(isChecked))
    }, [isChecked, task.id])
    
    function handleTaskCheck() {
        setIsChecked(!isChecked)
        const updatedTasksList = [...tasksList]
        updatedTasksList[index].isChecked = !isChecked
        setTasksList(updatedTasksList)
    }
    return (
        <div className='relative w-full'>
            <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                id="task"
                autoComplete="off"
                className={`block w-full pl-3 pr-16 py-4 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 peer transition-colors duration-150 ${task.isChecked ? 'border-green-500 text-green-500 dark:bg-emerald-900 dark:border-green-500' : 'border-gray-300 text-gray-900'}`}

                placeholder="Enter New Task"
                value={task.task}
                onChange={(e) => handleTaskEdit(e, index)}
                onBlur={handleBlur} />
            {/* <label class="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">5:23 AM, 01/06/2024</label> */}

            {index !== tasksList.length - 1 &&
                <div>
                    <button
                        onClick={() => handleTaskRemove(index)}
                        type="button"
                        className="text-slate-400 hover:text-red-400 hover:transition-all absolute end-0 bottom-2.5 font-medium rounded-lg text-sm px-1 py-2">
                        <svg className="opacity-90 w-6 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                        <span className="sr-only">Delete button</span>
                    </button>
                    <button
                        onClick={() => handleTaskCheck()}
                        type="button"
                        className={`hover:text-green-500 hover:transition-all absolute end-6 bottom-2.5 font-medium rounded-lg text-sm px-1.5 py-1
                        ${task.isChecked ? 'text-green-500' : 'text-slate-400'}`}>
                        <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 11.917 9.724 16.5 19 7.5" />
                        </svg>
                        <span className="sr-only">Mark as complete button</span>
                    </button>
                </div>
            }
        </div>
    )

}

export default TaskItem;