import React from "react";
import PropTypes from "prop-types";

import { Notification } from "./styles";

function BottomNotification({
  visible,
  backgroundColor,
  message,
  icon: Icon,
  notificationRef,
  onClick,
}) {
  return (
    <Notification
      backgroundColor={backgroundColor}
      visible={visible}
      ref={notificationRef}
      onClick={onClick}
    >
      {message}
      <Icon />
    </Notification>
  );
}

BottomNotification.propTypes = {
  visible: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string,
  message: PropTypes.string.isRequired,
  icon: PropTypes.func,
  onClick: PropTypes.func,
  notificationRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.element,
    }),
  ]),
};

BottomNotification.defaultProps = {
  backgroundColor: "#999",
  icon: () => null,
  onClick: () => {},
  notificationRef: null,
};

export default BottomNotification;
