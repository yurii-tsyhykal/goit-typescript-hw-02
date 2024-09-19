import toast, {  Toaster } from 'react-hot-toast';

import css from './SearchBar.module.css';
import { IoIosSearch } from 'react-icons/io';
import { useState } from 'react';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const notify = () => toast.error('Please enter ur word for search');
  const handleChange = e => {
    setSearchQuery(e.target.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.length === 0) {
      notify();
      return;
    }
    onSubmit(searchQuery);
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
