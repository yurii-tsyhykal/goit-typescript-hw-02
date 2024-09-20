import React from 'react';
import { LoadMore } from '../../App/App.types';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtn {
  onClick: LoadMore;
  disabled: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtn> = ({ onClick, disabled }) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={css.loadMoreBtn}
        disabled={disabled}
      >
        LoadMore
      </button>
    </>
  );
};

export default LoadMoreBtn;
