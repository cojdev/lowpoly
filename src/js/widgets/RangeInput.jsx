import React from 'react';
import styled from 'styled-components';
import { RangeSlider } from './Fields';

const Wrapper = styled.div`
  height: 20px;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
`;

const Track = styled.div.attrs(props => ({
  style: { background: props.background },
}))`
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, .1);
  /* border: 2px solid #eee; */
  border-radius: 100px;
  position: absolute;
  top: 3px;
  left: 0;
  right: 0;
  bottom: 3px;
`;

const Bead = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  border-radius: 3px;
  /* border: 2px solid #e24; */
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .2);

  :hover {
    transform: scale(1.2);
  }
`;

const StyledRangeSlider = styled(RangeSlider)`
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

export default class RangeInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      min: 0,
      max: 100,
      background: '#fff',
    };
    this.track = React.createRef();
    this.bead = React.createRef();

    this.setBeadPosition = this.setBeadPosition.bind(this);
  }

  componentDidMount() {
    this.setState({
      value: (this.props.value || this.state.value),
      min: (this.props.min || this.state.min),
      max: (this.props.max || this.state.max),
    });
    this.setBeadPosition(this.props.value);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setBeadPosition(this.props.value);
      this.setState({ value: this.props.value });
    }
  }

  setBeadPosition(value) {
    const bead = this.bead.current;
    const min = parseInt(this.props.min, 10) || 0;
    const max = parseInt(this.props.max, 10) || 100;

    const inputRatio = ((value / (max - min)) + min);

    bead.style.left = `calc(${inputRatio * 100}% - ${inputRatio * bead.offsetWidth}px)`;
    this.setState({ background: `linear-gradient(to right, #e24 ${inputRatio * 100}%, #888 ${inputRatio * 100}%` });
  }

  handleChange(e) {
    const { target } = e;
    this.setBeadPosition(target.value);
    this.setState({ value: target.value });
    this.props.onChange.call(this, e);
  }

  handleMouseUp(e) {
    this.props.onMouseUp.call(this, e);
  }

  render() {
    return (
      <Wrapper>
        <Track ref={this.track} background={this.props.background || this.state.background} />
        <Bead ref={this.bead} />
        <StyledRangeSlider
          value={this.state.value}
          min={this.state.min}
          max={this.state.max}
          name={this.props.name}
          onChange={this.handleChange.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)} />
      </Wrapper>
    );
  }
}
