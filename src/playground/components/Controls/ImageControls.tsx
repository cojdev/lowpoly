import React, { ChangeEvent, DragEvent, FC, useContext, useState } from 'react';
import styled from 'styled-components';
import ControlGroup from './ControlGroup';
import { Checkbox, Label } from '../../styles/fields';
import { colours } from '../../data/theme';
import Button from '../ui/Button';
import { Row, Column } from '../../styles/mixins';
import { SettingsState } from '../../data/defaults';
import useDispatch from '../../hooks/useDispatch';
import StateContext from '../../context/StateContext';

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

const ImageControls: FC = () => {
  const { image: settings, useImage } = useContext(StateContext).settings;
  const [state, setState] = useState({
    settings,
    useImage,
    value: '',
  });
  const dispatch = useDispatch();

  const loadImage = (target: HTMLInputElement | DataTransfer) => {
    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.onload = (f) => {
        const img = new Image();

        img.onload = () => {
          const newImage: SettingsState['image'] = (({
            src,
            width,
            height,
          }) => ({
            src,
            width,
            height,
          }))(img);
          dispatch({ type: 'SET_IMAGE', payload: newImage });
          setState({ ...state, settings: newImage });
        };

        img.src = f.target.result as string;
      };

      reader.readAsDataURL(target.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    loadImage(e.target);
  };

  const handleDrop = (e: DragEvent) => {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    loadImage(e.dataTransfer);
  };

  const handleDragOver = (e: DragEvent) => {
    // Prevent file from being opened
    e.preventDefault();
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, useImage: e.target.checked });
    dispatch({ type: 'SET_USE_IMAGE', payload: e.target.checked });
  };

  const handleResizeCanvas = () => {
    const { width, height } = state.settings;
    dispatch({ type: 'SET_DIMENSIONS', payload: { width, height } });
  };

  const { value } = state;

  return (
    <ControlGroup title="Image">
      {state.settings ? (
        <PreviewWrap>
          <Preview>
            <Thumbnail src={state.settings.src} />
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
            checked={settings.useImage}
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
