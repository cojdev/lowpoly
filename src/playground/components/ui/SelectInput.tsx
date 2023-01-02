import React, { useState, FocusEvent, ChangeEvent, FC } from 'react';
import styled, { css } from 'styled-components';
import { Label, StyledDropdown } from '../../styles/fields';

const StyledSelectInput = styled.div<{ focus: boolean }>`
  position: relative;
  margin-top: 1rem;
`;

const StyledLabel = styled(Label)<{ focus: boolean }>`
  position: absolute;
  top: 0;
  left: 1ch;
  padding: 0 0.5ch;
  pointer-events: none;
  transition: 150ms ease;
  color: #888;
  font-size: 0.9em;
  font-weight: 800;
  font-weight: 700;
  transform: translateY(-50%);
  background: linear-gradient(#f8f8f8, #fff);

  ${({ focus }) =>
    focus &&
    css`
      color: #e14;
    `};
`;

const SelectInput: FC<{
  label: string;
  name: string;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: ChangeEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  options: any;
  value?: string;
}> = ({ label, name, onBlur, onChange, onFocus, options, value }) => {
  const [state, setState] = useState({
    focus: false,
  });

  const handleFocus = (e: FocusEvent) => {
    setState({ ...state, focus: true });
    if (onFocus !== undefined) onFocus(e);
  };

  const handleBlur = (e: FocusEvent) => {
    setState({ ...state, focus: false });
    if (onBlur !== undefined) onBlur(e);
  };

  const handleChange = (e: ChangeEvent) => {
    if (onChange !== undefined) onChange(e);
  };

  const { focus } = state;

  const fieldProps = {
    name,
    value,
    focus,
    placeholder: 'Select...',
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  const dropdownOpts = Object.entries(options).map((item, index) => (
    <optgroup key={index} label={item[0]}>
      {Object.entries(item[1]).map((item2, index2) => (
        <option value={item2[0]} key={index2}>
          {item2[0]}
        </option>
      ))}
    </optgroup>
  ));

  return (
    <StyledSelectInput focus={focus}>
      <StyledLabel focus={focus || value !== ''} htmlFor={name}>
        {label}
      </StyledLabel>
      <StyledDropdown {...fieldProps}>
        <option value="null">{fieldProps.placeholder}</option>
        {dropdownOpts}
      </StyledDropdown>
    </StyledSelectInput>
  );
};

export default SelectInput;
