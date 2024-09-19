import { Audio } from 'react-loader-spinner';
import css from './Loader.module.css'

const Loader = () => {
  return (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="gray"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass={css.loader}
    />
  );
};

export default Loader;
