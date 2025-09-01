import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    const res = await API.get("/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!text) return;
    const res = await API.post(
      "/notes",
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNotes([...notes, res.data]);
    setText("");
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(notes.filter((n) => n._id !== id));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h1 className="title">My Notes</h1>

      <div className="form">
        <input
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New note..."
        />
        <button className="btn" onClick={addNote}>
          Add
        </button>
      </div>

      <ul className="notes-list">
        {notes.map((n) => (
          <li key={n._id} className="note-item">
            {n.text}
            <button className="delete-btn" onClick={() => deleteNote(n._id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button
        className="btn logout"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
