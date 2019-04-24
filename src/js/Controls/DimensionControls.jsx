import React from 'react';
import styled, { css } from 'styled-components';
import ControlGroup from '../widgets/ControlGroup';
import { TextField, Dropdown, NumberField, Label } from '../widgets/Fields';
import { Button } from '../widgets/Button';
import { row, column } from '../common/mixins';
import SingleInput from '../Forms/SingleInput';
import SelectInput from '../Forms/SelectInput';

const StyledControlGroup = styled(ControlGroup)`

`;

const Row = styled.div`
    ${row};
`;

const Column = styled.div`
    ${column};
    width: calc(50% - 1em);
`;

const SetButton = styled.button`
    ${Button};
`;

export default class DimensionControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
        }
    }

    componentDidMount() {

        this.setState({
            height: this.props.settings.height,
            width: this.props.settings.width
        })
    }

    handlePreset(e) {
        if (e.target.value !== 'null') {
            let p;
            this.props.presets.forEach(item => {
                p = item.values.find(item => item.label === e.target.value) || p;
            });
            let dims = [p.width, p.height];
            this.setState({
                width: dims[0],
                height: dims[1],
            });
        }
        
    }

    handleHeight(e) {
        this.setState({height: e.target.value});
    }

    handleWidth(e) {
        this.setState({width: e.target.value});
    }

    handleSubmit(e) {
        this.props.setDimensions.call(this, this.state);
        e.preventDefault();
    }

    render() {
        const presets = this.props.presets.map((item, index) => (
            <optgroup key={index} label={item.label}>

                {item.values.map((item2, index2) => {

                    let value = item2.label;
                
                    return (
                        <option
                        value={value}
                        key={index2}>{item2.label}</option>
                    );
                })}

            </optgroup>
        ));

        return (
            <StyledControlGroup title="Dimensions">
                <SelectInput
                    name="presets"
                    label="Presets"
                    onChange={this.handlePreset.bind(this)}>
                    {presets}
                </SelectInput>
                <Row>
                    <Column>
                        <SingleInput
                            type="number"
                            name="width"
                            label="Width"
                            value={this.state.width}
                            onChange={this.handleWidth.bind(this)} />
                    </Column>
                    <Column>
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

            </StyledControlGroup>
        );
    }
}