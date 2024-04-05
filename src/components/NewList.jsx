import React, { useState } from "react"

function NewList({ onNewList, existingLists }) {
    const [listName, setListName] = useState("")
    const [error, setError] = useState("")

    function handleNameChange(e) {
        setListName(e.target.value)
        setError("")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (listName.trim() !== "") {
            const isExisting = existingLists && existingLists.some(list => list.name === listName.trim())
            if (isExisting) {
                setError("List name already exists")
            } else {
                onNewList(listName)
                setListName("")
            }
        } else {
            setError("List name cannot be empty")
        }
    }
    
    return (
        <form className="max-w-sm" onSubmit={handleSubmit}>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 12h14m-7 7V5"/>
                    </svg>
                </div>
                <input 
                    type="text"
                    id="task" 
                    value={listName}
                    onChange={handleNameChange}
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Add New List" />
                {/* <button 
                    type="submit" 
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 11.917 9.724 16.5 19 7.5"/>
                        </svg>
                        <span className="sr-only">Add new list button</span>
                </button> */}
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}

export default NewList