import React from "react";

function TaskItem({ tasksList, task, index, inputRefs, handleTaskEdit, handleTaskRemove, handleBlur }) {
    return (
        <div className='relative'>
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
    )

}

export default TaskItem;