import React, { useState } from 'react'
function TodoList () {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setTodos([...todos, input])
        setInput('')
    }

    function deleteTodo(index) {
        const newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }

    return (
        <div>
            <h1>Todo List</h1>
            <form>
                <input type="text" value={input} onChange={handleChange} />
                <button onClick={handleSubmit}>Add Todo</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
            )
}

export default TodoList