import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { RangeSlider } from './Fields';

const Wrapper = styled.div`
  height: 20px;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
`;

const Track = styled.div.attrs((props) => ({
  style: { background: props.background },
}))`
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

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

const RangeInput = (props) => {
  const [background, setBackground] = useState('#fff');

  const track = useRef(null);
  const bead = useRef(null);

  const setBeadPosition = (value) => {
    const elem = bead.current;
    const min = parseInt(props.min, 10) || 0;
    const max = parseInt(props.max, 10) || 100;

    const inputRatio = value / (max - min) + min;

    elem.style.left = `calc(${inputRatio * 100}% - ${
      inputRatio * elem.offsetWidth
    }px)`;
    setBackground(
      `linear-gradient(to right, #e24 ${inputRatio * 100}%, #888 ${
        inputRatio * 100
      }%`
    );
  };

  useEffect(() => {
    setBeadPosition(props.value);
  }, [props.value]);

  const handleChange = (e) => {
    const { target } = e;
    setBeadPosition(target.value);
    props.onChange(e);
  };

  const handleMouseUp = (e) => {
    props.onMouseUp(e);
  };

  return (
    <Wrapper>
      <Track ref={track} background={props.background || background} />
      <Bead ref={bead} />
      <StyledRangeSlider
        value={props.value}
        min={props.min}
        max={props.max}
        name={props.name}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
    </Wrapper>
  );
};

export default RangeInput;
