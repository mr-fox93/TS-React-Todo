import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const TodosForm = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const App: React.FC = () => {
  type Todo = {
    text: string;
    completed: boolean;
    id: string;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  const addTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newTodo = { text: input, completed: false, id: uuidv4() };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput("");
    },
    [input]
  );

  const changeStatus = (id: string) => {
    const uptadeTodo = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodos(uptadeTodo);
  };

  const deleteItem = (id: string) => {
    const uptadeTodo = todos.filter((item) => item.id !== id);
    setTodos(uptadeTodo);
  };

  return (
    <>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add to list</button>
        <ul>
          {todos.map((todo) => (
            <TodosForm key={todo.id}>
              <li
                style={{
                  textDecoration:
                    todo.completed === true ? "line-through" : "none",
                }}
              >
                {todo.text}
              </li>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => changeStatus(todo.id)}
              />
              <button onClick={() => deleteItem(todo.id)}>delete</button>
            </TodosForm>
          ))}
        </ul>
      </form>
    </>
  );
};

export default App;
