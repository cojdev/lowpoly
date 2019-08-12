import React from 'react';
import styled from 'styled-components';
import ControlGroup from '../widgets/ControlGroup';
import { Label, RangeSlider } from '../widgets/Fields';
import { capitalise } from '../common/helpers';

const StyledControlGroup = styled(ControlGroup)`

`;

const duplicate = function (obj) {
  return Object.assign({}, obj);
};

export default class GeometryControls extends React.Component {
  constructor() {
    super();

    this.state = {
      settings: {},
    };
  }

  componentDidMount() {
    const settings = duplicate(this.props.settings);

    this.setState({ settings });
  }

  handleChange(option, e) {
    const settings = duplicate(this.state.settings);

    settings[option] = e.target.value;

    this.setState({ settings });
  }

  handleBlur(option, e) {
    const { value } = e.target;
    this.props.setGeometry.call(this, option, value);
  }

  render() {
    const { settings } = this.state;

    const options = Object.keys(settings).map((item, index) => (
      <div
        key={index}>
        <Label htmlFor={item}>{capitalise(item)}: {settings[item]}</Label>
        <RangeSlider
          id={item}
          min="0"
          max="100"
          value={settings[item] || 0}
          onChange={this.handleChange.bind(this, item)}
          onMouseUp={this.handleBlur.bind(this, item)} />
      </div>
    ));

    return (
      <StyledControlGroup title="Geometry">
        {options}
      </StyledControlGroup>
    );
  }
}
