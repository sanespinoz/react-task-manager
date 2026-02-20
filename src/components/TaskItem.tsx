import { useState } from 'react';
import type { Task } from '../types/task';

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
};

export function TaskItem({ task, onToggle, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleSave = () => {
    if (!editValue.trim()) return;
    onUpdate(task.id, editValue);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <>
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span
            onClick={() => onToggle(task.id)}
            style={{
              cursor: 'pointer',
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </span>

          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>X</button>
          </div>
        </>
      )}
    </li>
  );
}
