import React, { ChangeEvent, FC, FocusEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import { StyledTextField, StyledNumberField, Label } from '../../styles/fields';

const StyledSingleInput = styled.div<{ focus: boolean }>`
  position: relative;
  margin-top: 1rem;
`;

const StyledLabel = styled(Label)<{ focus: boolean }>`
  position: absolute;
  top: 1ch;
  left: 1ch;
  padding: 0 0.5ch;
  pointer-events: none;
  transition: 150ms ease;
  color: #888;
  background-color: transparent;

  ${({ focus }) =>
    focus &&
    css`
      top: 0;
      font-size: 0.8em;
      color: #e14;
      font-weight: 800;
      transform: translateY(-50%);
      background: linear-gradient(#f8f8f8, #fff);
      font-weight: 700;
    `};
`;

const SingleInput: FC<{
  label: string;
  name: string;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: ChangeEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  type?: 'text' | 'number';
  value?: string | number;
}> = ({ label, name, onBlur, onChange, onFocus, type, value }) => {
  const [state, setState] = useState({
    focus: false,
  });

  const handleFocus = (e: FocusEvent) => {
    setState({ ...state, focus: true });
    if (onFocus !== undefined) onFocus.call(this, e);
  };

  const handleBlur = (e: FocusEvent) => {
    setState({ ...state, focus: false });
    if (onBlur !== undefined) onBlur.call(this, e);
  };

  const handleChange = (e: ChangeEvent) => {
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

export default SingleInput;
