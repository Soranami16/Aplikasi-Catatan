import React from 'react';
import { getAllNotes } from '../utils/local-data';
import { getActiveNotes } from '../utils/network';
import NotesList from '../components/NotesList';
import { useSearchParams, Link } from 'react-router-dom';
import { LocaleConsumer } from '../contexts/LocaleContext';


function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title') || '';
  function changeSearchParams(keyword) {
    setSearchParams({ title: keyword });
  }
  return <HomePage defaultKeyword={title} onSearch={changeSearchParams} />;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
   this.state = {
      notes: [],
      keyword: props.defaultKeyword || '',
      loading: true,
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();
    this.setState({ 
      notes: data, 
      loading: false 
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState({ keyword });
    this.props.onSearch(keyword);
  }

  render() {
    const { notes, keyword, loading } = this.state;

    const filteredNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(keyword.toLowerCase());
    });

   return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section className="homepage">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
                <Link to="/notes/new" className="action" title={locale === 'id' ? 'Tambah Catatan' : 'Add Note'}>
                  <svg 
                    stroke="currentColor" 
                    fill="currentColor" 
                    strokeWidth="0" 
                    viewBox="0 0 24 24" 
                    height="1em" 
                    width="1em" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                  </svg>
                </Link>
              </div>

              <div className="search-bar">
                <input
                  type="text"
                  placeholder={locale === 'id' ? 'Cari berdasarkan judul...' : 'Search by title...'}
                  value={keyword}
                  onChange={(event) => this.onKeywordChangeHandler(event.target.value)}
                />
              </div>
              {loading ? (
              <p>Memuat catatan...</p>
              ) : (
                <NotesList notes={filteredNotes} />
              )}
            </section>
          );
        }}
      </LocaleConsumer>
    );
  }
}

export default HomePageWrapper;