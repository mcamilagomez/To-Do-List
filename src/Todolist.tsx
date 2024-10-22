import React, { useState, useEffect } from 'react';
import basura from '../src/assets/basura.svg';

interface Task {
    id: number;
    text: string;
}

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
  
    useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }, []);
  
    
    useEffect(() => {
      if (tasks.length > 0) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }, [tasks]);
  

    const addTask = () => {
        if (newTask.trim()) {
            const newTaskObj: Task = {
                id: Date.now(),
                text: newTask,
            };
            setTasks([newTaskObj, ...tasks]);
            setNewTask('');
        }
    };


    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };



    return (

        <div className="container">
            <h1 className="title">To Do List</h1>

            <div className="task-container">
                <input
                    type="text"
                    className="input-task"
                    placeholder="Agregar una tarea"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="add-task-button" onClick={addTask}>
                    Add
                </button>
            </div>
            <h2 className="task-title">Task</h2>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <div className='task-text'>
                            {task.text}
                        </div>
                        <button
                            className="delete-task-button"
                            onClick={() => deleteTask(task.id)}
                        >
                            <img src={basura} alt="" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default TodoList;