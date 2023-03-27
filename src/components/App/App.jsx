import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './app.css';

function App () {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);
  
  return (
    <div>
      <h1>TO DO APP</h1>
    </div>
  );

}

export default App
