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
    const response = await axios.get('/todo');
    setTasks(response.data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    if(newTask.trim() === '') return;
    await axios.post('/todo', {description: newTask});
    setNewTask('');
    fetchTasks();
  };

  const toggleComplete = async (id, isComplete) => {
    await axios.put(`/todo/${id}`, {isComplete: !isComplete});
  };

  const deleteTask = async (id) => {
    await axios.delete(`/todo/${id}`);
    fetchTasks();
  };
  
  return (
    <div>
      <h1>TO DO APP</h1>
      <form onSubmit={createTask}>
        <input 
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
      />
      <button type="submit">Create Task</button>
      </form>
      <ul> {/* list of tasks */}
      {tasks.map((task) => (
        <li key={task.id}>{task.description}
        <span className="actions">
          <button onClick={() => toggleComplete(task.id, task.is_complete)}>
            {task.is_complete ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </span>
        </li>
      ))}
        </ul>
    </div>
  );

}

export default App
