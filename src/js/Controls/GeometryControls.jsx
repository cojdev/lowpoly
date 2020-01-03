import React, { useState } from 'react';
import ControlGroup from '../widgets/ControlGroup';
import { Label } from '../widgets/Fields';
import { capitalise, clone } from '../common/helpers';
import RangeInput from '../widgets/RangeInput';

const GeometryControls = (props) => {
  const [settings, setSettings] = useState(clone(props.settings));

  /**
   * Update the local state
   * @param {string} option the setting being modified
   * @param {Event} e the event object
   */
  const handleChange = (option, e) => {
    setSettings({ ...settings, [option]: e.target.value });
  };

  /**
   * Update the global state
   * @param {string} option the setting being modified
   * @param {Event} e the event object
   */
  const handleBlur = (option, e) => {
    props.setGeometry(option, e.target.value);
  };

  const options = Object.keys(settings).map((item, index) => (
    <div
      key={index}>
      <Label htmlFor={item}>{capitalise(item)}: {settings[item]}</Label>
      <RangeInput
        id={item}
        min="0"
        max="100"
        value={settings[item] || 0}
        onChange={handleChange.bind(null, item)}
        onMouseUp={handleBlur.bind(null, item)} />
    </div>
  ));

  return (<ControlGroup title="Geometry">{options}</ControlGroup>);
};

export default GeometryControls;
