import { useState } from "react";

// 1. Define your data shape
interface Item {
  id: number;
  name: string;
  quantity: number;
}

export default function ItemManager() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Apples", quantity: 10 },
    { id: 2, name: "Bananas", quantity: 5 },
  ]);

  // Track which item is being edited, and the draft values
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Partial<Item>>({});

  // --- CREATE ---
  const addItem = (item: Omit<Item, "id">) => {
    setItems(prev => [...prev, { ...item, id: Date.now() }]);
  };

  // --- READ ---
  // items itself, or items.find(i => i.id === someId)

  // --- UPDATE ---
  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setDraft(item); // pre-fill the form with current values
  };

  const saveEdit = () => {
    if (editingId === null) return;

    setItems(prev =>
      prev.map(item =>
        item.id === editingId
          ? { ...item, ...draft } // merge changes into the existing item
          : item
      )
    );

    setEditingId(null);
    setDraft({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({});
  };

  // --- DELETE ---
  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div>
      <ul>
        {items.map(item =>
          editingId === item.id ? (
            <li key={item.id}>
              <input
                value={draft.name ?? ""}
                onChange={e => setDraft({ ...draft, name: e.target.value })}
              />
              <input
                type="number"
                value={draft.quantity ?? 0}
                onChange={e =>
                  setDraft({ ...draft, quantity: Number(e.target.value) })
                }
              />
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </li>
          ) : (
            <li key={item.id}>
              {item.name} — {item.quantity}
              <button onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}