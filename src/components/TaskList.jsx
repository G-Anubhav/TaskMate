import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, deleteTask, toggleComplete, setPriority, editTask }) => {
  return (
    <ul>
      <AnimatePresence>
        {tasks.map(task => (
          <motion.li 
            key={task.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="task-card"
          >
            <div className={`task-title ${task.completed ? 'completed' : ''}`}>
              <span className="title" onClick={() => toggleComplete(task.id)}>{task.title}</span>
              {task.completed && <span className="completed-label">completed</span>}
            </div>
            <div className="task-controls">
              <select onChange={(e) => setPriority(task.id, e.target.value)} value={task.priority}>
                <option value="0">No Priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
              <button onClick={() => editTask(task)}>Edit</button>  {/* Edit button */}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TaskList;
