import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import TambahPage from './TambahPage';
import DetailPageID from './DetailPage';
import ArchivesPageWrapper from './ArchivesPage';
import NotFoundPage from './NotFoundPage';
import {ThemeProvider} from '../contexts/ThemeContext';
import ToggleTheme from './ToggleTheme';
import { LocaleProvider } from '../contexts/LocaleContext';
import ToggleLocale from './ToggleLocale';
import Login from './Login';
import { getAccessToken, getUserLogged, putAccessToken } from '../utils/network';
import { AuthProvider } from '../contexts/AuthContext';
import Register from './Register';
import { MdLogout } from 'react-icons/md';


function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  async function onLoginSuccess({ accessToken }){
    putAccessToken(accessToken);
    const {data} = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout(){
    setAuthedUser(null);
    putAccessToken('');
  }

  useEffect(() => {
    async function fetchUser() {
      const token = getAccessToken();

      if (!token) {
        setInitializing(false);
        return;
      }

      const { data , error} = await getUserLogged();

      if (!error) {
        setAuthedUser(data);
      }
        setInitializing(false);
      }
      fetchUser();
    }, []);
  
  const authContextValue = useMemo(() => ({
    authedUser,
    setAuthedUser,
    onLogout
  }), [authedUser]);

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale
    };
  }, [locale]);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-locale', locale);
  }, [locale]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme
    };
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  if (initializing) {
    return null; 
  }

  if (authedUser === null) {
      return (
        <AuthProvider value={authContextValue}>
          <LocaleProvider value={localeContextValue}>
            <ThemeProvider value={themeContextValue}>
              <div className="app-container">
                <header>
                  <h1>{locale === 'id' ? 'Catatan Amah' : "Amah's Diary"}</h1>
                  <nav className="navigation">
                    <ul>
                      <li><ToggleLocale /></li>
                      <li><ToggleTheme /></li>
                    </ul>
                  </nav>
                </header>
                <main>
                  <Routes>
                    <Route path="/*" element={<Login loginSuccess={onLoginSuccess} />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
              </div>
            </ThemeProvider>
          </LocaleProvider>
        </AuthProvider>
      );
    }

  return (
    <AuthProvider value={authContextValue}>
      <LocaleProvider value={localeContextValue}>
          <ThemeProvider value={themeContextValue}>
            <div className="app-container">
              <header>
                <h1><a href="/">{locale === 'id' ? 'Catatan Amah' : 'Notes Amah'}</a></h1>
                <nav className="navigation">
                  <ul>
                    <li> <a href="/archives">{locale === 'id' ? 'Arsip' : 'Archives'}</a></li>
                  </ul>
                </nav>
                <ToggleLocale />
                <ToggleTheme />
                <button onClick={onLogout} className="button-logout" title="Logout">
                        <MdLogout />
                        {authedUser.name}
                      </button>
              </header>

            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/new" element={<TambahPage />} />
                <Route path="/notes/:id" element={<DetailPageID />} />
                <Route path="/archives" element={<ArchivesPageWrapper />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/login" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    </AuthProvider>
  );
}

export default App;