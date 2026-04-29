import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="notes-list-empty">
      <h2 style={{ fontSize: '64px', marginBottom: '16px' }}>404</h2>
      <p>Page not found</p>
      <br />
      <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
        Kembali ke Beranda
      </Link>
    </section>
  );
}

export default NotFoundPage;