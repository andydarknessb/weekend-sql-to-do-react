import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App () {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(`/todo`); //fetches tasks from server
    setTasks(response.data); // sets tasks in state
  };

  const createTask = async (e) => {
    e.preventDefault(); //prevents page from reloading on submit
    if(newTask.trim() === '') return; //checks if new task is not empty
    await axios.post(`/todo`, {description: newTask}); //sends a POST request to server to create a new task
    setNewTask(''); //resets new task input field
    fetchTasks(); //fetches updated list of tasks from server
  };

  const toggleComplete = async (id, isComplete) => {
    await axios.put(`/todo/${id}`, {isComplete: !isComplete}); //sends a PUT request to server to toggle the is_complete task
    fetchTasks(); //fetches updated list of tasks from server
  };

  const deleteTask = async (id) => {
    await axios.delete(`/todo/${id}`); //sends a delete request to server to delete the task
    fetchTasks(); //fetches updated list of tasks from server
  };

  const updateTask = async (id, description) => {
    await axios.put(`/todo/${id}`, { description: description }); //sends a PUT request to server to update the description of the task
    fetchTasks(); //fetches updated list of tasks from server
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
          className="task-input"
      />
      <button type="submit">Create Task</button>
      </form>
      <ul> {/* list of tasks */}
      {tasks.map((task) => (
          <li key={task.id}>
            {task.is_complete ? (
              <del>{task.description}</del> //strike through task when complete
            ) : (
              <span contentEditable onBlur={(e) => updateTask(task.id, e.target.innerText)}>
                {task.description}
              </span>
            )} 
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
