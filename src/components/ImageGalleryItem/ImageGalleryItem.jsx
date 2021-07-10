import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item, Image } from "./ImageGalleryItem.styled";
import pendingImage from "../../images/pendingImage.png";

export class ImageGalleryItem extends Component {
  state = { loaded: false };

  handleImageLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;
    const { previewImage, tags, onImageSelect } = this.props;

    return (
      <Item>
        <Image
          src={loaded ? previewImage : pendingImage}
          alt={tags}
          onClick={onImageSelect}
          onLoad={this.handleImageLoad}
        />
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
