import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import TaskSearch from './components/TaskSearch';
import TaskSort from './components/TaskSort';
import './style.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('default');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    setTasks([...tasks, { id: Date.now(), title, completed: false, priority: 0 }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const setPriority = (id, priority) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, priority } : task));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
  };

  const updateTask = (id, updatedTitle) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, title: updatedTitle } : task));
    setIsEditing(false);
    setCurrentTask({});
  };

  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortCriteria === 'priority') {
      return b.priority - a.priority;
    } else if (sortCriteria === 'completed') {
      return a.completed - b.completed;
    }
    return a.id - b.id;
  });

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskInput addTask={addTask} />
      <TaskSearch handleSearch={handleSearch} />
      <TaskSort handleSort={handleSort} />
      <TaskList 
        tasks={sortedTasks} 
        deleteTask={deleteTask} 
        toggleComplete={toggleComplete} 
        setPriority={setPriority} 
        editTask={editTask}
      />
      {isEditing && (
        <div>
          <input 
            type="text" 
            value={currentTask.title} 
            onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})} 
          />
          <button onClick={() => updateTask(currentTask.id, currentTask.title)}>Update</button>
        </div>
      )}
    </div>
  );
};

export default App;
