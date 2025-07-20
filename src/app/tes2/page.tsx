'use client';
import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null as null | Task);

  const addTask = () => {
    if (taskTitle.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: number) => {
    const editedTask = tasks.find(task => task.id === id);
    if (editedTask) {
      setTaskToEdit(editedTask);
    }
  }

  const EditTaskModal = ({ task, onSave }: {
    task: Task | null,
    onSave: (updatedTask: Task) => void
  }) => {
    const [newTitle, setNewTitle] = useState(task ? task.title : '');

    const saveChanges = () => {
      if (task && newTitle.trim() !== '') {
        onSave({
          id: task.id,
          title: newTitle,
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-md">
          <h2>Edit Task</h2>
          <TaskTitleField value={newTitle} onChange={setNewTitle}/>
          <button onClick={saveChanges} className='bg-blue-100 p-2 rounded mt-2'>Save</button>
          <button onClick={() => setTaskToEdit(null)} className='bg-red-100 p-2 rounded mt-2 ml-2'>Cancel</button>
        </div>
      </div>
    );
  };

  const saveTaskChanges = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setTaskToEdit(null);
  };

  const TaskTitleField = ({
    value, onChange
  }: {
    value: string,
    onChange: (value: string) => void
  }) => {
    const [taskTitleValue, setTaskTitleValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.toLowerCase();
      setTaskTitleValue(newValue);
      onChange(newValue);
    };

    return (
      <input
        type="text"
        value={taskTitleValue}
        onChange={handleChange}
        placeholder="Enter task title"
        className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      />
    );
  }

  return (
    <div className="relative bg-white">

      <div className="flex h-screen">


        <div className='bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto my-auto text-black grid gap-4'>
          <h1>Task Manager</h1>
          <div className="flex gap-2">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
              className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button onClick={addTask} className='bg-blue-100 p-2 rounded w-fit whitespace-nowrap'>Add Task</button>
          </div>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className='flex justify-between items-center bg-white p-2 rounded shadow mb-2'>
                {task.title}
                <div className='flex gap-2'>
                  <button onClick={() => removeTask(task.id)} className='bg-red-100 p-2'>Remove</button>
                  <button onClick={() => editTask(task.id)} className='bg-green-100 p-2'>Edit</button>
                </div>
              </li>
            ))}
          </ul>

          {taskToEdit && (
            <EditTaskModal
              task={taskToEdit}
              onSave={saveTaskChanges}
            />
          )}
        </div>
      </div>
    </div>
  );
}