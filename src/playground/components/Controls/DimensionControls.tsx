import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';
import ControlGroup from './ControlGroup';
import Button from '../ui/Button';
import { Row, Column } from '../../styles/mixins';
import SingleInput from '../ui/SingleInput';
import SelectInput from '../ui/SelectInput';
import presets, { SettingsPresets } from '../../data/presets';
import useDispatch from '../../hooks/useDispatch';
import StateContext from '../../context/StateContext';

const SetButton = styled(Button)``;

const DimensionControls: FC = () => {
  const { dimensions: settings } = useContext(StateContext).settings;
  const [height, setHeight] = useState(settings.height);
  const [width, setWidth] = useState(settings.width);

  const dispatch = useDispatch();

  const handlePreset = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== 'null') {
      const p = Object.values(
        presets.dimensions as SettingsPresets['dimensions']
      ).find((item) => item[e.target.value] !== undefined)[e.target.value];

      setWidth(p.width);
      setHeight(p.height);
    }
  };

  const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const handleWidth = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    dispatch({ type: 'SET_DIMENSIONS', payload: { width, height } });
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
            options={presets.dimensions}
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

export default DimensionControls;
