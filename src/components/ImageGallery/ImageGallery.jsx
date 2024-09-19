//ImageGallery.jsx
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ photoArray, openModal }) => {
  return (
    <ul className={css.galleryList}>
      {photoArray.map(({ id, ...objPhoto }) => {
        return (
          <li className={css.galleryItemList} key={id}>
            <ImageCard {...objPhoto} openModal={openModal} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
