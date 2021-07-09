import axios from "axios";
import React, { Component } from "react";
import { StyledApp } from "./App.styled";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Api } from "../../constants/Api";

export class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    images: [],
    selectedImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      const images = await this.getImages();

      this.setState((prevState) => {
        return { images: [...prevState.images, ...images] };
      });

      page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
    }
  }

  getImages = async () => {
    const { searchQuery, page } = this.state;
    const url = `${Api.BASE_URL}?q=${searchQuery}&page=${page}&key=${Api.KEY}&image_type=photo&orientation=horizontal&per_page=12
  `;
    const { data } = await axios.get(url);

    return data.hits;
  };

  resetState = () => {
    this.setState({
      searchQuery: "",
      page: 1,
      images: [],
      selectedImage: null,
    });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  onSubmit = (searchQuery) => {
    this.resetState();
    this.setState({ searchQuery });
  };

  onImageSelect = (image) => {
    this.setState({ selectedImage: image });
  };

  onLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, selectedImage } = this.state;

    return (
      <StyledApp>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} onClick={this.onImageSelect} />
        {images.length > 0 && <Button onClick={this.onLoadMore} />}
        {selectedImage && (
          <Modal image={selectedImage} onClose={this.closeModal} />
        )}
      </StyledApp>
    );
  }
}
