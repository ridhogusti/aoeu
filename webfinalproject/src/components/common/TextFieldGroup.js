import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ id, field, value, label, error, type, onChange, checkUserExists, icon }) => (
  <div className={classnames('md-form', { 'has-error': error })}>
    <i className={icon} />
    <input 
      id={id} 
      className="form-control"
      onChange={onChange}
      onBlur={checkUserExists}
      value={value}
      type={type}
      name={field}
    />
    <label htmlFor={id}>{label}</label>

    {error && <span className="red-text">{error}</span>}
  </div>
);

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func,
};

TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
