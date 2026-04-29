import React from "react";
import NoteItem from "./NotesItem";

function NotesList({notes, onArchive, dataTestId = 'notes-list', searchKeyword}){
  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>Tidak ada catatan</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note}  onArchive={onArchive}/>
      ))}
    </div>
  );
}

export default NotesList;