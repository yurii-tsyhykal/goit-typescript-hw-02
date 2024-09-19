//ImageCard.jsx
import css from './ImageCard.module.css';

const ImageCard = ({
  alt_description,
  urls: { small, regular },
  openModal,
}) => {
  return (
    <div className={css.cardBox}>
      <img
        src={small}
        alt={alt_description}
        className={css.cardImage}
        onClick={() => openModal(regular, alt_description)}
      />
    </div>
  );
};

export default ImageCard;
