import React from 'react';
import { Image, openModal } from '../../App/App.types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface ImageGallery {
  photoArray: Image[];
  openModal: openModal;
}

const ImageGallery: React.FC<ImageGallery> = ({ photoArray, openModal }) => {
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
