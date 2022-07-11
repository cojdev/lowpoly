import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  useContext,
  useState,
} from 'react';
import ControlGroup from './ControlGroup';
import { Label } from '../../styles/fields';
import { capitalise } from '../../utils/helpers';
import RangeInput from '../ui/RangeInput';
import { SettingsState } from '../../data/defaults';
import Button from '../ui/Button';
import useDispatch from '../../hooks/useDispatch';
import StateContext from '../../context/StateContext';

const GeometryControls: FC = () => {
  const { geometry: settings } = useContext(StateContext).settings;
  const [state, setState] = useState({ ...settings });
  const dispatch = useDispatch();

  /**
   * Update the local state
   * @param {string} option the setting being modified
   * @param {Event} e the event object
   */
  const handleChange = (
    option: keyof SettingsState['geometry'],
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [option]: e.target.value });
  };

  /**
   * Update the global state
   * @param {string} option the setting being modified
   * @param {Event} e the event object
   */
  const handleBlur = (
    option: keyof SettingsState['geometry'],
    e: FocusEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'SET_GEOMETRY',
      payload: { option, value: parseInt(e.target.value, 10) },
    });
  };

  const options = Object.keys(state).map(
    (item: keyof SettingsState['geometry'], index) => (
      <div key={index}>
        <Label htmlFor={item}>
          {capitalise(item)}: {state[item]}
        </Label>
        <RangeInput
          id={item}
          min={0}
          max={100}
          value={state[item] || 0}
          onChange={handleChange.bind(null, item)}
          onMouseUp={handleBlur.bind(null, item)}
        />
      </div>
    )
  );

  return (
    <ControlGroup title="Geometry">
      {options}
      <Button
        onClick={() => {
          dispatch({ type: 'NEW_SEED', payload: Math.random() });
        }}>
        New Random seed
      </Button>
    </ControlGroup>
  );
};

export default GeometryControls;
