import { TaskItem } from './TaskItem';
import type { Task } from '../types/task';

type Props = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
};

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: Props) {
  if (tasks.length === 0) {
    return <p className="empty-message">There are no tasks to display.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
