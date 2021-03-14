import React from "react";
import PropTypes from "prop-types";

import { Title } from "./styles";

function UnderlinedTitle({ children }) {
  return (
    <div>
      <Title>{children}</Title>
    </div>
  );
}

UnderlinedTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};

export default UnderlinedTitle;
