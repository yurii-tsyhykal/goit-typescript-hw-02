//ImageCard.jsx
import React from 'react';
import css from './ImageCard.module.css';
import { Image, openModal, Urls } from '../../App/App.types';

interface ImageCard extends Omit<Image, 'id'> {
  urls: Urls;
  openModal: openModal;
}

const ImageCard: React.FC<ImageCard> = ({
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
