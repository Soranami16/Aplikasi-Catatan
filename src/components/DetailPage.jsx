import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network';
import { showFormattedDate } from '../utils/index';
import parser from 'html-react-parser';

function DetailPageID(){
  const {id} = useParams();
  const navigate = useNavigate();

  return <DetailPage id={id} navigate={navigate} />
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      loading: true
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getNote(this.props.id);
    this.setState({
      note: data,
      loading: false
    });
  }

  async onDeleteHandler() {
    await deleteNote(this.props.id);
    this.props.navigate('/');
  }

  async onArchiveHandler() {
    const { note } = this.state;

    if (note.archived) {
      await unarchiveNote(this.props.id);
    } else {
      await archiveNote(this.props.id);
    }

    this.props.navigate('/');
  }

  render() {
    const {note, loading} = this.state;
   if (loading) {
      return <p className='notes-list-empty'>Memuat catatan...</p>
    }

    if (!note) {
      return <p className='notes-list-empty'>Catatan tidak ditemukan</p>
    }
    return (
      <section className="detail-page">
        <h2 className="detail-page__title">{note.title}</h2>
        <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
        <div className="detail-page__body">{parser(note.body)}</div>
        
        <div className="detail-page__action">
          <button className="action" title={note.archived ? "Aktifkan" : "Arsipkan"} onClick={this.onArchiveHandler}>
            {note.archived ? (
              /* Ikon Unarchive*/
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"></path>
                <path d="M7 12h10l-5-4.5z"></path>
              </svg>
            ) : (
              /* Ikon Archive*/
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.47 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12.06l.82 1H5.12z"></path>
              </svg>
            )}
          </button>

          <button className="action" title="Hapus" onClick={this.onDeleteHandler}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
          </button>
        </div>
      </section>
    );
  }
}

export default DetailPageID;