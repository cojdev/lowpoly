import React from 'react';
import { RangeSlider } from './Fields';

export default class RangeInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      min: 0,
      max: 100,
    };
  }

  componentDidMount() {
    this.setState({
      value: (this.props.value || this.state.value),
      min: (this.props.min || this.state.min),
      max: (this.props.max || this.state.max),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onChange.call(this, e);
  }

  handleMouseUp(e) {
    this.props.onMouseUp.call(this, e);
  }

  render() {
    return (
      <RangeSlider
        value={this.state.value}
        min={this.state.min}
        max={this.state.max}
        name={this.props.name}
        onChange={this.handleChange.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)} />
    );
  }
}
