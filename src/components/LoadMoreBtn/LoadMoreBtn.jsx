import css from './LoadMoreBtn.module.css'
const LoadMoreBtn = ({ onClick, disabled }) => {
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