import axios from "axios";
import React, { Component } from "react";
import { StyledApp } from "./App.styled";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Api } from "../../constants/Api";

export class App extends Component {
  state = { searchQuery: "", page: 1, images: [] };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      const images = await this.getImages();

      this.setState((prevState) => {
        return { images: [...prevState.images, ...images] };
      });
    }

    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  resetState = () => {
    this.setState({ searchQuery: "", page: 1, images: [] });
  };

  getImages = async () => {
    const { searchQuery, page } = this.state;
    const url = `${Api.BASE_URL}?q=${searchQuery}&page=${page}&key=${Api.KEY}&image_type=photo&orientation=horizontal&per_page=12
  `;
    const { data } = await axios.get(url);

    return data.hits;
  };

  onSubmit = (searchQuery) => {
    this.resetState();
    this.setState({ searchQuery });
  };

  onLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images } = this.state;

    return (
      <StyledApp>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} />
        {images.length > 0 && (
          <>
            <Button onClick={this.onLoadMore} />
          </>
        )}
      </StyledApp>
    );
  }
}
