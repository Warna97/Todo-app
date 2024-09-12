export interface Todo {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
  }
  
  export interface User {
    email: string;
    password: string;
    name?: string;
  }

  export interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    signup: (email: string, password: string, name: string) => void;
    logout: () => void;
  }
  

  export interface TodoFormProps {
    onSubmit: (todo: Todo) => void;
    initialTodo?: Todo;
  }

  