import React from "react";

function NoteActionButton({ variant, onClick, archived }) {
  const className = variant === 'delete' 
    ? 'note-item__delete-button' 
    : 'note-item__archive-button';

  let label;
  if (variant === 'delete') {
    label = 'Delete';
  } else {
    label = archived ? 'Pindahkan' : 'Arsipkan';
  }

  return (
    <button 
      className={className} 
      type="button" 
      onClick={onClick}
      data-testid={`note-item-${variant}-button`}
    >
      {label}
    </button>
  );
}

function ButtonTheme(){
  const [theme, setTheme] = useState('dark');
}

export default NoteActionButton;
