import React, { useRef } from "react";
import PropTypes from "prop-types";

import { Container, Content, Title, Button } from "./styles";

function DeletionConfirmationModel({ onCancel, onConfirm, isOpen }) {
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
          <Title>Certeza que deseja excluir este item?</Title>

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

DeletionConfirmationModel.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default DeletionConfirmationModel;
