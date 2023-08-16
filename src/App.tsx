import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Task {
  id: string;
  name: string;
  completed: boolean;
  date: string;
}

const TodoTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    const currentDateTime = new Date().toLocaleString();
    if (newTask) {
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          name: newTask,
          completed: false,
          date: currentDateTime,
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: "20px",
          marginTop: "20px",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          value={newTask}
          //label="New task"
          placeholder="enter new task..."
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            width: "200px",
            height: "40px",
            "& input": {
              padding: "10px 14px",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          sx={{
            width: "200px",
            height: "40px",
            padding: 0,
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setTasks([])}
          sx={{
            width: "200px",
            height: "40px",
            padding: 0,
          }}
        >
          Delete All
        </Button>
      </Box>
      <Paper sx={{ width: "80%", mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Tasks</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Add Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  sx={task.completed ? { textDecoration: "line-through" } : {}}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                  </TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{task.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TodoTable;

/*
import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const TodosForm = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  :disabled {
    cursor: not-allowed;
    background-color: #e0e0e0;
  }
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
      if (input) {
        const newTodo = { text: input, completed: false, id: uuidv4() };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setInput("");
      }
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
        <Button disabled={input.length <= 0} type="submit">
          Add to list
        </Button>
        <Button disabled={todos.length <= 0} onClick={() => setTodos([])}>
          Clear All
        </Button>
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

*/
