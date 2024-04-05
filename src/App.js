import React, { useEffect, useState } from 'react'
import TodoList from './components/TodoList'
import NewList from './components/NewList'
function App() {
  const [lists, setLists] = useState([])

  useEffect(() => {
    const storedLists = localStorage.getItem('lists')
    if (storedLists) {
      setLists(JSON.parse(storedLists))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists))
  }, [lists])

  function handleNewList(name) {
    setLists([...lists, { name, tasks: [] }])
  }
  return (
    <div className="App flex flex-wrap gap-4 m-5">
      {lists.map((list, index) => (
        <div key={index}>
          <TodoList listName={list.name} tasks={list.tasks} />
        </div>
      ))}
      <NewList onNewList={handleNewList} />
    </div>
  );
}

export default App;
