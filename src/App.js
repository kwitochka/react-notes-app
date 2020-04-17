import React, { useState, useEffect, useReducer } from "react";
import { Context } from './Context';
import TodoList from "./TodoList";
import reducer from "./reducer"

export default function App() {
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')))
  

  const [todoTitle, setTodoTitle] = useState("");

//1.callback 2.list of dependancies


  useEffect( ()=> {
    localStorage.setItem('todos', JSON.stringify(state))
  }, 
  [state] 
  );

  const addTodo = (event) => {
    if (event.key === "Enter") {
      // console.log('adding');
      dispatch({
        type: 'add',
        payload: todoTitle
      })
      setTodoTitle('');
    }
  
  };

  return (
    <Context.Provider value={{
dispatch
    }}>
    <div className="container">
      <h1>Todo app</h1>

      <div className="input-field">
        <input
          type="text"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
          onKeyPress={addTodo}
        />
        <label>Todo name</label>
      </div>

      <TodoList todos={state} />
    </div>
    </Context.Provider>
  );
}
