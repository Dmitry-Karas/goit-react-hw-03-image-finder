import React, { Component } from "react";
import { createPortal } from "react-dom";
import { GiCrossMark } from "react-icons/gi";
import { Overlay, ModalWindow, CloseButton } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const { onClose } = this.props;

    if (e.code === "Escape") {
      onClose();
    }
  };

  handleBackdropClick = (e) => {
    const { onClose } = this.props;

    if (e.target !== e.currentTarget) {
      return;
    }

    onClose();
  };

  render() {
    const { image, tags, onClose } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={image} alt={tags} />
          <CloseButton onClick={onClose}>
            <GiCrossMark size="30" />
          </CloseButton>
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
