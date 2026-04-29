import React from "react";
import {showFormattedDate} from '../utils/index';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';

function NoteItem({note, onArchive, searchKeyword}) {
  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${note.id}`}>{note.title}</Link>

      </h3>
      <p className="note-item__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="note-item__body">{parser(note.body)}</div>
    </div>
  );
}


export default NoteItem