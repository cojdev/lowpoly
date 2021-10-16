import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { StyledTextField, StyledNumberField, Label } from '../../styles/fields';

const StyledSingleInput = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const StyledLabel = styled(Label)`
  position: absolute;
  top: 1ch;
  left: 1ch;
  padding: 0 0.5ch;
  pointer-events: none;
  transition: 150ms ease;
  color: #888;
  background-color: transparent;

  ${(p) =>
    p.focus &&
    css`
      top: 0;
      font-size: 0.9em;
      color: #e14;
      font-weight: bold;
      transform: translateY(-50%);
      background: linear-gradient(#f8f8f8, #fff);
      font-weight: 700;
    `};
`;

const SingleInput = ({
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  type,
  value,
}) => {
  const [state, setState] = useState({
    focus: false,
  });

  useEffect(() => {
    setState({ ...state, value });
  }, [value]);

  const handleFocus = (e) => {
    setState({ ...state, focus: true });
    if (onFocus !== undefined) onFocus.call(this, e);
  };

  const handleBlur = (e) => {
    setState({ ...state, focus: false });
    if (onBlur !== undefined) onBlur.call(this, e);
  };

  const handleChange = (e) => {
    if (onChange !== undefined) onChange.call(this, e);
  };

  const { focus } = state;

  const fieldProps = {
    name,
    value,
    focus,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  let input;

  switch (type) {
    case 'text':
      input = <StyledTextField {...fieldProps} />;
      break;
    case 'number':
      input = <StyledNumberField {...fieldProps} />;
      break;
    default:
      input = <StyledTextField {...fieldProps} />;
      break;
  }

  return (
    <StyledSingleInput focus={focus}>
      <StyledLabel focus={focus || value !== ''} htmlFor={name}>
        {label}
      </StyledLabel>
      {input}
    </StyledSingleInput>
  );
};

SingleInput.propTypes = {
  label: PropTypes.any,
  name: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.any,
};

export default SingleInput;
