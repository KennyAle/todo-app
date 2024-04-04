import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewList from './components/NewList';
function App() {
  const [lists, setLists] = useState([])

  function handleNewList(name) {
    setLists([...lists, { name, tasks: [] }])
  }
  return (
    <div className="App">
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
