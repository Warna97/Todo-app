import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { Todo } from '../types';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from '../utils/localStorageUtils';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TodoPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

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
  };

  const handleEditTodo = (todo: Todo) => {
    setCurrentTodo(todo);
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

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <Box sx={{ mb: 4 }}>
          <TodoForm onSubmit={handleAddTodo} initialTodo={currentTodo || undefined} />
        </Box>
        <TodoList
          todos={todos}
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
    </Container>
  );
};

export default TodoPage;
