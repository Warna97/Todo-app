import React from 'react';
import { Todo } from '../types';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Edit, Delete, CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete, onToggleComplete }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', p: 2 }}>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: todo.isCompleted ? 'lightgreen' : 'lightcoral',
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <ListItemText
              primary={todo.title}
              secondary={todo.description}
              sx={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => onToggleComplete(todo.id)} color="primary">
                {todo.isCompleted ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
              </IconButton>
              <IconButton onClick={() => onEdit(todo)} color="secondary">
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(todo.id)} color="error">
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
