import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './app.css';

function App () {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks');
    setTasks(response.data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    if(newTask.trim() === '') return;
    await axios.post('/api/tasks', {description: newTask});
    setNewTask('');
    fetchTasks();
  };
  
  return (
    <div>
      <h1>TO DO APP</h1>
      <form onSubmit={createTask}></form>
    </div>
  );

}

export default App
