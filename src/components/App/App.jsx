import React, { Component } from "react";
import { StyledApp } from "./App.styled";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Spinner } from "../Spinner/Spinner";
import { Api } from "../../services/api";

export class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    images: [],
    selectedImage: null,
    status: "idle",
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: "pending" });

      try {
        const images = await Api.getImages(searchQuery, page);

        if (!images.length) {
          throw new Error();
        }

        this.setState((prevState) => {
          return {
            images: [...prevState.images, ...images],
            status: "resolve",
          };
        });
      } catch (error) {
        this.setState({ status: "idle" });
        console.log(error, `по запросу ${searchQuery} ничего не найдено`);
      }

      page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
    }
  }

  resetState = () => {
    this.setState({
      searchQuery: "",
      page: 1,
      images: [],
      selectedImage: null,
      status: "idle",
    });
  };

  onSubmit = (searchQuery) => {
    const repeatedQuery = this.state.searchQuery === searchQuery;

    if (repeatedQuery) {
      return;
    }

    this.resetState();
    this.setState({ searchQuery });
  };

  onModalClose = () => {
    this.setState({ selectedImage: null });
  };

  onImageSelect = (src, alt) => {
    this.setState({ selectedImage: { src, alt } });
  };

  onLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, selectedImage, status } = this.state;

    switch (status) {
      case "idle":
        return (
          <StyledApp>
            <Searchbar onSubmit={this.onSubmit} />
          </StyledApp>
        );

      case "pending":
        return (
          <StyledApp>
            <Searchbar onSubmit={this.onSubmit} />
            <ImageGallery images={images} onImageSelect={this.onImageSelect} />
            {images.length > 0 && <Button onClick={this.onLoadMore} />}

            <Spinner />
            {/* <LoaderContainer>
              <Loader
                type="ThreeDots"
                color="#3f51b5"
                height={200}
                width={200}
              />
            </LoaderContainer> */}
          </StyledApp>
        );

      case "resolve":
        return (
          <StyledApp>
            <Searchbar onSubmit={this.onSubmit} />
            <ImageGallery images={images} onImageSelect={this.onImageSelect} />
            {images.length > 0 && <Button onClick={this.onLoadMore} />}
            {selectedImage && (
              <Modal image={selectedImage} onClose={this.onModalClose} />
            )}
          </StyledApp>
        );

      default:
        return (
          <StyledApp>
            <Searchbar onSubmit={this.onSubmit} />
          </StyledApp>
        );
    }
  }
}
