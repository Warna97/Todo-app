import React, { useState, useEffect } from 'react';
import { Todo } from '../types';
import { TextField, Button, Box } from '@mui/material';

interface TodoFormProps {
  onSubmit: (todo: Todo) => void;
  initialTodo?: Todo;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialTodo }) => {
  const [todo, setTodo] = useState<Todo>({
    id: initialTodo?.id || Date.now(),
    title: initialTodo?.title || '',
    description: initialTodo?.description || '',
    isCompleted: initialTodo?.isCompleted || false,
  });

  useEffect(() => {
    if (initialTodo) {
      setTodo(initialTodo);
    }
  }, [initialTodo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(todo);
    setTodo({
      id: Date.now(),
      title: '',
      description: '',
      isCompleted: false,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        name="title"
        value={todo.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        name="description"
        value={todo.description}
        onChange={handleChange}
        required
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {initialTodo ? 'Update Todo' : 'Add Todo'}
      </Button>
    </Box>
  );
};

export default TodoForm;
