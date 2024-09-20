import { Audio } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <Audio
      height="80"
      width="80"
      color="gray"
      ariaLabel="loading"
      wrapperClass={css.loader}
    />
  );
};

export default Loader;
