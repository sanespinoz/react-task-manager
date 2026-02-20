import { useEffect, useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import type { Task, Filter } from './types/task';
import {
  fetchTasks,
  createTask,
  updateTaskService,
  deleteTaskService,
} from './services/taskService';
import './index.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addTask = async (title: string) => {
    const task: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    const created = await createTask(task);
    setTasks((prev) => [...prev, created]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = async (id: number) => {
    await deleteTaskService(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = async (id: number, newTitle: string) => {
    await updateTaskService(id, newTitle);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
        localStorage.setItem('tasks', JSON.stringify(data));
        setError(null);
      } catch (err) {
        console.error(err);

        const saved = localStorage.getItem('tasks');
        if (saved) {
          setTasks(JSON.parse(saved));
        }

        setError('The tasks could not be loaded from the server.');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // 🔥 Lógica de filtrado
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;


  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <p>Loading tasks...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h2>Task Manager</h2>

      <div className="counter">
        Total: {totalTasks} | Completed: {completedTasks} | Pending:{' '}
        {pendingTasks}
      </div>

      <TaskForm onAdd={addTask} />

      <div className="filter-buttons">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'active' : ''}
        >
          Pending
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onUpdate={updateTask}
      />
    </div>
  );
}

export default App;
