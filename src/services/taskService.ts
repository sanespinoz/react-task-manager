import type { Task } from '../types/task';

let fakeTasks: Task[] = [
  {
    id: 1,
    title: 'Aprender React',
    completed: true,
  },
  {
    id: 2,
    title: 'Practicar TypeScript',
    completed: false,
  },
];

const simulateDelay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

// 🔹 Fetch
export const fetchTasks = async (): Promise<Task[]> => {
  await simulateDelay(1000);

  // Simular error aleatorio (opcional)
  const shouldFail = false;

  if (shouldFail) {
    throw new Error('Error al cargar tareas');
  }

  return fakeTasks;
};

// 🔹 Create
export const createTask = async (task: Task): Promise<Task> => {
  await simulateDelay(500);
  fakeTasks.push(task);
  return task;
};

// 🔹 Update
export const updateTaskService = async (
  id: number,
  newTitle: string,
): Promise<void> => {
  await simulateDelay(500);

  fakeTasks = fakeTasks.map((task) =>
    task.id === id ? { ...task, title: newTitle } : task,
  );
};

// 🔹 Delete
export const deleteTaskService = async (id: number): Promise<void> => {
  await simulateDelay(500);
  fakeTasks = fakeTasks.filter((task) => task.id !== id);
};
