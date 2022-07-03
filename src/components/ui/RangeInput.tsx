import React, {
  useState,
  useRef,
  useEffect,
  FC,
  InputHTMLAttributes,
} from 'react';
import styled from 'styled-components';
import { RangeSlider } from '../../styles/fields';

const Wrapper = styled.div`
  height: 20px;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
`;

const Track = styled.div.attrs<{ background: string }>(({ background }) => ({
  style: { background },
}))<{ background?: string }>`
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  /* border: 2px solid #eee; */
  border-radius: 100px;
  position: absolute;
  top: 5px;
  left: 0;
  right: 0;
  bottom: 5px;
`;

const Bead = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  border-radius: 100px;
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

const RangeInput: FC<
  InputHTMLAttributes<HTMLInputElement> & {
    background?: string;
    max: number;
    min: number;
    name?: any;
    onChange: any;
    onMouseUp: any;
    value: any;
  }
> = ({ background, max, min, name, onChange, onMouseUp, value }) => {
  const [bg, setBg] = useState('#fff');

  const track = useRef(null);
  const bead = useRef(null);

  const setBeadPosition = (val: number) => {
    const elem = bead.current;
    const min2 = min || 0;
    const max2 = max || 100;

    const inputRatio = val / (max2 - min2) + min2;

    elem.style.left = `calc(${inputRatio * 100}% - ${
      inputRatio * elem.offsetWidth
    }px)`;
    setBg(
      `linear-gradient(to right, #e24 ${inputRatio * 100}%, #888 ${
        inputRatio * 100
      }%`
    );
  };

  useEffect(() => {
    setBeadPosition(value);
  }, [value]);

  const handleChange = (e: { target: any }) => {
    const { target } = e;
    setBeadPosition(target.value);
    onChange(e);
  };

  const handleMouseUp = (e: any) => {
    onMouseUp(e);
  };

  return (
    <Wrapper>
      <Track ref={track} background={background || bg} />
      <Bead ref={bead} />
      <StyledRangeSlider
        value={value}
        min={min}
        max={max}
        name={name}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
    </Wrapper>
  );
};

export default RangeInput;
