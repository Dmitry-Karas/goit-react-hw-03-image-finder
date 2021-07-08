import PropTypes from "prop-types";
import { Item, Image } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ previewImage, largeImage, tags }) => {
  return (
    <Item>
      <Image src={previewImage} alt={tags} data-large={largeImage} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
