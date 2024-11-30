// src/components/common/Message.js
import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ variant = 'info', children }) => {
  return <div className={`alert alert-${variant}`}>{children}</div>;
};

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Message;
