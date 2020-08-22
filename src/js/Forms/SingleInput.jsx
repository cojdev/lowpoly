import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { TextField, NumberField, Label } from '../widgets/Fields';

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

const fieldCSS = css`
  display: block;
  width: 100%;
  border: 2px solid #eee;
  padding: 1ch;
  border-radius: 3px;
  transition: 150ms ease;
  outline: none;
  font-size: 0.9rem;
  font-family: inherit;
  margin: 1em 0;

  ${(p) =>
    p.focus &&
    css`
      border-color: #e14;
    `};
`;

const StyledNumberField = styled(NumberField)`
  ${fieldCSS};
`;

const StyledTextField = styled(TextField)`
  ${fieldCSS};
`;

const SingleInput = (props) => {
  const [state, setState] = useState({
    value: props.value !== undefined ? props.value : '',
    focus: false,
  });

  useEffect(() => {
    setState({ ...state, value: props.value });
  }, [props.value]);

  const handleFocus = (e) => {
    setState({ ...state, focus: true });
    if (props.onFocus !== undefined) props.onFocus.call(this, e);
  };

  const handleBlur = (e) => {
    setState({ ...state, focus: false });
    if (props.onBlur !== undefined) props.onBlur.call(this, e);
  };

  const handleChange = (e) => {
    setState({ ...state, value: e.target.value });
    if (props.onChange !== undefined) props.onChange.call(this, e);
  };

  const { name, label, type } = props;
  const { value, focus } = state;

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

export default SingleInput;
