import React, { useRef } from "react";
import PropTypes from "prop-types";

import { Container, Content, Button } from "./styles";

function UpdateModal({ onCancel, onConfirm, isOpen, children }) {
  const containerRef = useRef(null);

  function handleClickOutsideOfModal(e) {
    if (e.target === containerRef.current) {
      onCancel();
    }
  }

  if (isOpen) {
    return (
      <Container onClick={handleClickOutsideOfModal} ref={containerRef}>
        <Content>
          <div>{children}</div>

          <div>
            <Button variant="outline" color="#a24e4e" onClick={onCancel}>
              Cancelar
            </Button>
            <Button color="#4ea24e" onClick={onConfirm}>
              Confirmar
            </Button>
          </div>
        </Content>
      </Container>
    );
  }

  return null;
}

UpdateModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UpdateModal;
