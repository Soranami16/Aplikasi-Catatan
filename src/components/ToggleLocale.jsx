import React, { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';
import { MdGTranslate } from 'react-icons/md';

function ToggleLocale() {
  const { toggleLocale } = useContext(LocaleContext);

  return (
    <button className="toggle-locale" onClick={toggleLocale}>
      <MdGTranslate size={24} />
    </button>
  );
}

export default ToggleLocale;