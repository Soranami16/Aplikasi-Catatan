import React from 'react';
import { getArchivedNotes } from '../utils/network';
import NotesList from '../components/NotesList';
import { useSearchParams } from 'react-router-dom';
import { LocaleConsumer } from '../contexts/LocaleContext';

function ArchivesPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('title') || '';

  function changeSearchParams(keyword) {
    setSearchParams({ title: keyword });
  }

  return <ArchivesPage defaultKeyword={keyword} onSearch={changeSearchParams} />;
}

class ArchivesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      searchKeyword: props.defaultKeyword || '',
      loading: true,
    };

    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();
    this.setState({
      notes: data,
      loading: false,
    });
  }

  onSearchHandler(keyword) {
    this.setState({ searchKeyword: keyword });
    this.props.onSearch(keyword);
  }

  render() {
    const { notes, searchKeyword,loading} = this.state;

    const filteredNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    return (
      <LocaleConsumer>
        {({ locale }) => (
          <section className="archives-page">
            <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
            
            <section className="search-bar">
              <input
                type="text"
                placeholder={locale === 'id' ? 'Cari berdasarkan judul di arsip...' : 'Search archived notes...'}
                value={searchKeyword}
                onChange={(event) => this.onSearchHandler(event.target.value)}
              />
            </section>

            {loading ? (
              <p className="notes-list-empty">Memuat arsip...</p>
            ) : (
              <NotesList notes={filteredNotes} />
            )}
          </section>
        )}
      </LocaleConsumer>
    );
  }
}

export default ArchivesPageWrapper;