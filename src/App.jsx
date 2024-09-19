import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import axios from 'axios';
import ImageModal from './components/ImageModal/ImageModal';

const KEY_API = 'O-HfVoQS7fyfvdMOowudOuINHi2ei8XvxwlmVSPr6JQ';

axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${KEY_API}`;
const perPage = 12;
function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const {
          data: { results, total },
        } = await axios.get('/search/photos/', {
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
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onHandleSubmit = values => {
    setQuery(values);
    setImages([]);
    setPage(1);
    setError(null);
    setIsVisible(false);
    setIsEmpty(false);
  };
  const LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setIsModal(true);
    setModalImage(url);
    setDescription(alt);
  };
  const closeModal = () => {
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
      {isVisible && (
        <LoadMoreBtn onClick={LoadMore} disabled={isLoading}>
          {isLoading ? <Loader /> : 'Load More'}
        </LoadMoreBtn>
      )}

      {isLoading && isVisible && <Loader />}
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
