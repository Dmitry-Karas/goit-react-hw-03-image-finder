import PropTypes from "prop-types";
import { Item, Image } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ previewImage, tags, onClick }) => {
  return (
    <Item>
      <Image src={previewImage} alt={tags} onClick={onClick} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
