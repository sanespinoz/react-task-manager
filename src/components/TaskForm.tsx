import { useState } from 'react';

type Props = {
  onAdd: (title: string) => void;
};

export function TaskForm({ onAdd }: Props) {
  const [value, setValue] = useState<string>('');

  const handleSubmit = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
