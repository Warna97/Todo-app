import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { Todo } from '../types';
import { Container, Typography, Box, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from '../utils/localStorageUtils';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TodoPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [open, setOpen] = useState<boolean>(false); 
  const [filter, setFilter] = useState<'all' | 'completed' | 'todo'>('all'); 

  useEffect(() => {
    setTodos(getTodosFromLocalStorage());
  }, []);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = (newTodo: Todo) => {
    if (currentTodo) {
      setTodos(todos.map((todo) => (todo.id === currentTodo.id ? newTodo : todo)));
      setCurrentTodo(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setOpen(false); 
  };

  const handleEditTodo = (todo: Todo) => {
    setCurrentTodo(todo);
    setOpen(true); 
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpen = () => {
    setCurrentTodo(null); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); 
  };

  // Filtering logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.isCompleted;
    if (filter === 'todo') return !todo.isCompleted;
    return true;
  });

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add a Task
          </Button>
        </Box>

        {/* Filtering section */}
        <Box sx={{ mb: 4 }}>
          <ToggleButtonGroup
            color="primary"
            value={filter}
            exclusive
            onChange={(_event, newFilter) => setFilter(newFilter)}
            aria-label="task filtering"
          >
            <ToggleButton value="all" aria-label="all todos">
              All ({todos.length})
            </ToggleButton>
            <ToggleButton value="todo" aria-label="incomplete todos">
              Todo ({todos.filter(todo => !todo.isCompleted).length})
            </ToggleButton>
            <ToggleButton value="completed" aria-label="completed todos">
              Completed ({todos.filter(todo => todo.isCompleted).length})
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}  
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
        />

        <Box sx={{ mt: 4 }}>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>

      {/* Dialog for adding/editing tasks */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{currentTodo ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TodoForm onSubmit={handleAddTodo} initialTodo={currentTodo || undefined} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TodoPage;
