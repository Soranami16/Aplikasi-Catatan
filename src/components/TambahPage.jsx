import React from 'react';
import { addNote } from '../utils/network';
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';

function AddPage() {
  const navigate = useNavigate();

 async function onAddNoteHandler({ title, body }) {
    const { error } = await addNote({ title, body });

    if (!error) {
      console.log('Data Berhasil Ditambahkan ke API');
      navigate('/'); 
    } else {
      alert('Gagal menambahkan catatan. Silakan coba lagi.');
    }
  }

  return (
    <section className="add-new-page">
      <FormInput addNote={onAddNoteHandler} />
    </section>
  );
}

export default AddPage;