import React, { useState } from 'react';
import styled from 'styled-components';
import ControlGroup from '../widgets/ControlGroup';
import { Checkbox, Label } from '../widgets/Fields';
import { colours } from '../common/theme';
import Button from '../widgets/Button';
import { Row, Column } from '../common/mixins';

const PreviewWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
`;

const Preview = styled.div`
  border-radius: 3px;
  position: relative;
  overflow: hidden;

  :after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 2px 5px rgba(10, 20, 40, 0.05);
    border-radius: 3px;
  }
`;

const StyledFileInput = styled.input`
  display: none;

  + label {
    display: block;
    padding: 1em;
    border-radius: 4px;
    border: 2px solid #eee;
    color: ${colours.primary};
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:after {
      display: block;
      position: absolute;
      content: '';
      top: 4px;
      left: 4px;
      right: 4px;
      bottom: 4px;
      border-radius: 2px;
      border: 1px dashed #eee;
    }
  }
`;

const Thumbnail = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 200px;
`;

const ImageControls = (props) => {
  const [state, setState] = useState({
    settings: props.settings,
    useImage: props.useImage,
    value: '',
  });

  const loadImage = (target) => {
    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.onload = (f) => {
        const img = new Image();

        img.onload = () => {
          const newImage = (({ src, width, height }) => ({
            src,
            width,
            height,
          }))(img);
          props.setImage(newImage);
          setState({ ...state, settings: newImage, useImage: true });
        };

        img.src = f.target.result;
      };

      reader.readAsDataURL(target.files[0]);
    }
  };

  const handleChange = (e) => {
    loadImage(e.target);
  };

  const handleDrop = (e) => {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    loadImage(e.dataTransfer);
  };

  const handleDragOver = (e) => {
    // Prevent file from being opened
    e.preventDefault();
  };

  const handleCheckboxChange = (e) => {
    setState({ ...state, useImage: e.target.checked });
    props.setUseImage(e.target.checked);
  };

  const handleResizeCanvas = () => {
    const { width, height } = state.settings;
    props.setDimensions({ width, height });
  };

  const { settings, value, useImage } = state;

  return (
    <ControlGroup title="Image">
      {settings ? (
        <PreviewWrap>
          <Preview>
            <Thumbnail src={settings.src} />
          </Preview>
        </PreviewWrap>
      ) : (
        ''
      )}
      <StyledFileInput
        id="file"
        type="file"
        value={value}
        onChange={handleChange}
      />
      <label htmlFor="file" onDrop={handleDrop} onDragOver={handleDragOver}>
        Select an Image...
      </label>
      <br />
      <Row>
        <Column>
          <Checkbox
            id="use-image-checkbox"
            checked={useImage}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="use-image-checkbox">Use image</Label>
        </Column>
        <Column>
          <Button onClick={handleResizeCanvas}>Resize to image</Button>
        </Column>
      </Row>
    </ControlGroup>
  );
};

export default ImageControls;
