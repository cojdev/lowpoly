import React, { useState } from 'react';
import styled from 'styled-components';
import ControlGroup from '../widgets/ControlGroup';
import Button from '../widgets/Button';
import { Row, Column } from '../common/mixins';
import SingleInput from '../Forms/SingleInput';
import SelectInput from '../Forms/SelectInput';

const SetButton = styled(Button)``;

const DimensionControls = (props) => {
  const [height, setHeight] = useState(props.settings.height);
  const [width, setWidth] = useState(props.settings.width);
  const { presets } = props;

  const handlePreset = (e) => {
    if (e.target.value !== 'null') {
      const p = Object.values(presets)
        .find(item => item[e.target.value] !== undefined)[e.target.value];

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
    props.setDimensions({ width, height });
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
            options={presets} />
        </Column>

        {/* Width */}
        <Column width={0.275}>
          <SingleInput
            type="number"
            name="width"
            label="Width"
            value={width}
            onChange={handleWidth} />
        </Column>

        {/* Height */}
        <Column width={0.275}>
          <SingleInput
            type="number"
            name="height"
            label="Height"
            value={height}
            onChange={handleHeight} />
        </Column>
      </Row>
      <SetButton
        onClick={handleSubmit}>Apply</SetButton>

    </ControlGroup>
  );
};

export default DimensionControls;
