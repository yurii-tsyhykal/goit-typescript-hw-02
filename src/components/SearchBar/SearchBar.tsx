import toast, { Toaster } from 'react-hot-toast';

import css from './SearchBar.module.css';
import { IoIosSearch } from 'react-icons/io';
import React, { useState } from 'react';
import { onHandleSubmit } from '../../App/App.types';

interface SearchBar {
  onSubmit: onHandleSubmit;
}

const SearchBar: React.FC<SearchBar> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const notify = () => toast.error('Please enter ur word for search');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim().length === 0) {
      notify();
      return;
    }
    onSubmit(searchQuery.trim());
    setSearchQuery('');
  };

  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          name="userSearch"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchQuery}
        />
        <button className={css.searchBtn} type="submit">
          <IoIosSearch className={css.searchIcon} />
        </button>
        <Toaster position="bottom-center" reverseOrder={false} />
      </form>
    </header>
  );
};

export default SearchBar;
