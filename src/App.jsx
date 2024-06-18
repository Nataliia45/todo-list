import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import TodoList from './components/TodoList/TodoList';
import AuthenticationForm from './components/AuthenticationForm';
import { API_URL, API_SIGN_UP, API_LOGIN } from './url';

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [authFormVisible, setAuthFormVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const handleSignUp = async ({ login: username, password }) => {
    try {
      const response = await axios.post(`${API_URL}${API_SIGN_UP}`, {
        username,
        password
      });
      console.log(response.data);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Sign up error', error);
    }
  };

  const handleSignIn = async ({ login: username, password }) => {
    try {
      const response = await axios.post(`${API_URL}${API_LOGIN}`, {
        username,
        password
      });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      fetchTodos(); // Fetch todos after login
    } catch (error) {
      console.error('Sign in error', error);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    setTodos([]); // Clear todos after logout
  };

  const handleAddTodo = async (title) => {
    try {
      const response = await axios.post(`${API_URL}/todos`, { title });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const handleEditTodo = async (id, title) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, { title });
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error editing todo', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={handleSignOut}>Sign Out</button>
          <TodoList
            todos={todos}
            onAddTodo={handleAddTodo}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      ) : (
        <div>
          <AuthenticationForm
            handleSignUp={handleSignUp}
            handleSignIn={handleSignIn}
            setAuthFormVisible={setAuthFormVisible}
          />
          {authFormVisible && (
            <>
              <SignUpForm handleSignUp={handleSignUp} />
              <SignInForm handleSignIn={handleSignIn} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
