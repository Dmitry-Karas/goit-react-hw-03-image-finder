import PropTypes from "prop-types";
import { List } from "./ImageGallery.styled";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map((image) => {
        const { id, webformatURL, largeImageURL, tags } = image;

        return (
          <ImageGalleryItem
            key={id}
            previewImage={webformatURL}
            largeImage={largeImageURL}
            tags={tags}
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
