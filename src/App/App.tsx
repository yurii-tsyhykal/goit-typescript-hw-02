import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../components/LoadMoreBtn/LoadMoreBtn';
import axios from 'axios';
import ImageModal from '../components/ImageModal/ImageModal';
import {
  closeModal,
  FetchResponse,
  Image,
  LoadMore,
  onHandleSubmit,
  openModal,
} from './App.types';

const KEY_API: string = 'O-HfVoQS7fyfvdMOowudOuINHi2ei8XvxwlmVSPr6JQ';

axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${KEY_API}`;
const perPage: number = 12;
function App() {
  const [query, setQuery] = useState<string | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const {
          data: { results, total },
        } = await axios.get<FetchResponse>('/search/photos/', {
          params: {
            query: query,
            orientation: 'landscape',
            per_page: perPage,
            page,
          },
        });
        if (!results.length) return setIsEmpty(true);
        setImages(prevImages => [...prevImages, ...results]);
        setIsVisible(page < Math.ceil(total / perPage));
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Something went wrong. Try again');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onHandleSubmit: onHandleSubmit = values => {
    setQuery(values);
    setImages([]);
    setPage(1);
    setError(null);
    setIsVisible(false);
    setIsEmpty(false);
  };
  const LoadMore: LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal: openModal = (url, alt) => {
    setIsModal(true);
    setModalImage(url);
    setDescription(alt);
  };
  const closeModal: closeModal = () => {
    setIsModal(false);
    setModalImage(null);
    setDescription(null);
  };
  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery photoArray={images} openModal={openModal} />
      )}
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {isVisible && <LoadMoreBtn onClick={LoadMore} disabled={isLoading} />}
      {isEmpty && <p>Sorry.There are no images.</p>}
      <ImageModal
        modalIsOpen={isModal}
        closeModal={closeModal}
        src={modalImage}
        alt={description}
      />
    </>
  );
}

export default App;
