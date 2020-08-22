import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Label, Dropdown } from '../widgets/Fields';

const StyledSelectInput = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const StyledLabel = styled(Label)`
  position: absolute;
  top: 0;
  left: 1ch;
  padding: 0 0.5ch;
  pointer-events: none;
  transition: 150ms ease;
  color: #888;
  font-size: 0.9em;
  font-weight: bold;
  font-weight: 700;
  transform: translateY(-50%);
  background: linear-gradient(#f8f8f8, #fff);

  ${(p) =>
    p.focus &&
    css`
      color: #e14;
    `};
`;

const StyledDropdown = styled(Dropdown)`
  display: block;
  -webkit-appearance: none;
  width: 100%;
  background-color: #fff;
  border: 2px solid #eee;
  padding: 1ch;
  border-radius: 3px;
  transition: 150ms ease;
  outline: none;
  font-size: 0.9rem;
  font-family: inherit;

  ${(p) =>
    p.focus &&
    css`
      border-color: #e14;
    `};
`;

const SelectInput = (props) => {
  const [state, setState] = useState({
    value: props.value || '',
    focus: false,
  });

  useEffect(() => {
    setState({ ...state, value: props.value });
  }, [props.value]);

  const handleFocus = (e) => {
    setState({ ...state, focus: true });
    if (props.onFocus !== undefined) props.onFocus(e);
  };

  const handleBlur = (e) => {
    setState({ ...state, focus: false });
    if (props.onBlur !== undefined) props.onBlur(e);
  };

  const handleChange = (e) => {
    setState({ ...state, value: e.target.value });
    if (props.onChange !== undefined) props.onChange(e);
  };

  const { name, label } = props;
  const { value, focus } = state;

  const fieldProps = {
    name,
    value,
    focus,
    placeholder: 'Select...',
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  const options = Object.entries(props.options).map((item, index) => (
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
        {options}
      </StyledDropdown>
    </StyledSelectInput>
  );
};

export default SelectInput;
