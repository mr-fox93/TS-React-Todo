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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

interface Task {
  id: string;
  name: string;
  completed: boolean;
  date: string;
  priority: string;
}

const TodoTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [priority, setPriority] = useState<string>("Low");

  const handleChange = (id: string, newPriority: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

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
          priority: priority,
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
          flexDirection: ["column", "column", "row"],
          "& > *": { width: ["100%", "auto"] },
        }}
      >
        <TextField
          variant="outlined"
          value={newTask}
          autoComplete="off"
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
          disabled={!newTask}
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
          disabled={!tasks.length}
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
      <Paper sx={{ width: ["95%", "80%"], mb: 2 }}>
        <TableContainer>
          <Table sx={{ tableLayout: ["fixed", "auto"] }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell sx={{ width: ["20px", "auto"] }}>Tasks</TableCell>
                <TableCell sx={{ width: ["20px", "auto"] }}>Delete</TableCell>
                <TableCell sx={{ width: ["45px", "auto"] }}>Date</TableCell>
                <TableCell>Priority</TableCell>
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
                  <TableCell style={{ padding: "1rem" }}>
                    <FormControl fullWidth sx={{ minWidth: ["100px", "auto"] }}>
                      <InputLabel id="demo-simple-select-label">
                        Priority
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={task.priority}
                        label="Priority"
                        onChange={(e: SelectChangeEvent) =>
                          handleChange(task.id, e.target.value)
                        }
                      >
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
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
