import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import ControlGroup from './ControlGroup';
import Button from '../ui/Button';
import { Row, Column } from '../../styles/mixins';
import SingleInput from '../ui/SingleInput';
import SelectInput from '../ui/SelectInput';

const SetButton = styled(Button)``;

const DimensionControls = ({ presets, settings, setDimensions }) => {
  const [height, setHeight] = useState(settings.height);
  const [width, setWidth] = useState(settings.width);

  const handlePreset = (e) => {
    if (e.target.value !== 'null') {
      const p = Object.values(presets).find(
        (item) => item[e.target.value] !== undefined
      )[e.target.value];

      setWidth(p.width);
      setHeight(p.height);
    }
  };

  const handleHeight = (e) => {
    setHeight(e.target.value);
  };

  const handleWidth = (e) => {
    setWidth(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDimensions({ width, height });
  };

  return (
    <ControlGroup title="Dimensions">
      <Row>
        {/* Presets */}
        <Column width={0.45}>
          <SelectInput
            name="presets"
            label="Presets"
            onChange={handlePreset}
            options={presets}
          />
        </Column>

        {/* Width */}
        <Column width={0.275}>
          <SingleInput
            type="number"
            name="width"
            label="Width"
            value={width}
            onChange={handleWidth}
          />
        </Column>

        {/* Height */}
        <Column width={0.275}>
          <SingleInput
            type="number"
            name="height"
            label="Height"
            value={height}
            onChange={handleHeight}
          />
        </Column>
      </Row>
      <SetButton onClick={handleSubmit}>Apply</SetButton>
    </ControlGroup>
  );
};

DimensionControls.propTypes = {
  presets: PropTypes.any,
  setDimensions: PropTypes.func,
  settings: PropTypes.shape({
    height: PropTypes.any,
    width: PropTypes.any,
  }),
};

export default DimensionControls;
