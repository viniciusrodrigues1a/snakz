import React from "react";
import PropTypes from "prop-types";
import { IoSadOutline } from "react-icons/io5";

import { Container, IconContainer, Text } from "./styles";

function EmptyList({ message, children, icon: Icon }) {
  return (
    <Container>
      <IconContainer>
        <Icon />
      </IconContainer>

      <Text>
        {message} <IoSadOutline color="#555" size={28} />
      </Text>

      {children && <div style={{ marginTop: "3.375rem" }}>{children}</div>}
    </Container>
  );
}

EmptyList.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

EmptyList.defaultProps = {
  children: null,
};

export default EmptyList;
