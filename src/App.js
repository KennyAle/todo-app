import React from 'react';
import TodoList from './components/TodoList';
import NewList from './components/NewList';
function App() {
  return (
    <div className="App">
      <TodoList />
      <NewList />
    </div>
  );
}

export default App;
