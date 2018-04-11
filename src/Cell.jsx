import React from 'react';
import PropTypes from 'prop-types';

export default function Cell(props) {
  const className = `item ${props.alive ? ' life' : ''}`;
  return <div className={className} onClick={props.click} />;
}

Cell.propTypes = {
  alive: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired,
};
