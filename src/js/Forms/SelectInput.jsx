import React from 'react';
import styled, { css } from 'styled-components';
import {
  Label, Dropdown,
} from '../widgets/Fields';


const StyledSelectInput = styled.div`
    position: relative;
    margin-top: 1rem;
`;

const StyledLabel = styled(Label)`
    position: absolute;
    top: 0;
    left: 1ch;
    padding: 0 .5ch;
    pointer-events: none;
    transition: 150ms ease;
    color: #888;
    font-size: 0.9em;
    font-weight: bold;
    font-weight: 700;
    transform: translateY(-50%);
    background: linear-gradient(#f8f8f8, #fff);

    ${p => p.focus && css`
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
    font-size: .9rem;
    font-family: inherit;

    ${p => p.focus && css`
        border-color: #e14;
    `};
`;

export default class SelectInput extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      focus: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.setState({
      value: (this.props.value !== undefined ? this.props.value : this.state.value),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  handleFocus(e) {
    this.setState({ focus: true });
    if (this.props.onFocus !== undefined) this.props.onFocus.call(this, e);
  }

  handleBlur(e) {
    this.setState({ focus: false });
    if (this.props.onBlur !== undefined) this.props.onBlur.call(this, e);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    if (this.props.onChange !== undefined) this.props.onChange.call(this, e);
  }

  render() {
    const { name, label } = this.props;
    const { value, focus } = this.state;

    const fieldProps = {
      name,
      value,
      focus,
      placeholder: 'Select...',
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };

    const options = Object.entries(this.props.options).map((item, index) => (
      <optgroup key={index} label={item[0]}>

        {Object.entries(item[1]).map((item2, index2) => (
          <option
            value={item2[0]}
            key={index2}>{item2[0]}</option>
        ))}

      </optgroup>
    ));

    return (
      <StyledSelectInput focus={focus}>
        <StyledLabel
          focus={focus || value !== ''}
          htmlFor={name}>{label}</StyledLabel>
        <StyledDropdown {...fieldProps}>
          <option
            value="null">{fieldProps.placeholder}</option>
          {options}
        </StyledDropdown>
      </StyledSelectInput>
    );
  }
}
