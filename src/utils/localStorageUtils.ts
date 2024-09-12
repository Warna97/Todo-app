import { Todo } from '../types';


export const getTodosFromLocalStorage = (): Todo[] => {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  };
  
  export const saveTodosToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  