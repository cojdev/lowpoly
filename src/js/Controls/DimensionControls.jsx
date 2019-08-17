import React from 'react';
import styled from 'styled-components';
import ControlGroup from '../widgets/ControlGroup';
import Button from '../widgets/Button';
import { row, column } from '../common/mixins';
import SingleInput from '../Forms/SingleInput';
import SelectInput from '../Forms/SelectInput';

const Row = styled.div`
    ${row};
`;

const Column = styled.div`
    ${column};
    width: calc(${props => props.width * 100 || 50}% - .5rem);
`;

const SetButton = styled(Button)``;

export default class DimensionControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
  }

  componentDidMount() {
    this.setState({
      height: this.props.settings.height,
      width: this.props.settings.width,
    });
  }

  handlePreset(e) {
    const { presets } = this.props;
    if (e.target.value !== 'null') {
      const p = Object.values(presets)
        .find(item => item[e.target.value] !== undefined)[e.target.value];

      const dims = [p.width, p.height];
      this.setState({
        width: dims[0],
        height: dims[1],
      });
    }
  }

  handleHeight(e) {
    this.setState({ height: e.target.value });
  }

  handleWidth(e) {
    this.setState({ width: e.target.value });
  }

  handleSubmit(e) {
    this.props.setDimensions.call(this, this.state);
    e.preventDefault();
  }

  render() {
    const { presets } = this.props;

    return (
      <ControlGroup title="Dimensions">
        <Row>

          {/* Presets */}
          <Column width={0.5}>
            <SelectInput
              name="presets"
              label="Presets"
              onChange={this.handlePreset.bind(this)}
              options={presets} />
          </Column>

          {/* Width */}
          <Column width={0.25}>
            <SingleInput
              type="number"
              name="width"
              label="Width"
              value={this.state.width}
              onChange={this.handleWidth.bind(this)} />
          </Column>

          {/* Height */}
          <Column width={0.25}>
            <SingleInput
              type="number"
              name="height"
              label="Height"
              value={this.state.height}
              onChange={this.handleHeight.bind(this)} />
          </Column>
        </Row>

        <SetButton
          onClick={this.handleSubmit.bind(this)}>Resize</SetButton>

      </ControlGroup>
    );
  }
}
