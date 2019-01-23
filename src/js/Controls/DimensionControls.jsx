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
        console.log(e.target.value);
        if (e.target.value !== 'null') {
            let dims = e.target.value.split('-');
            this.setState({
                width: dims[0],
                height: dims[1],
            }, () => {console.log(this.state.width, this.state.height)});
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
        console.log('handleSubmit');
        e.preventDefault();
    }

    render() {
        const presets = this.props.presets.map((item, index) => (
            <optgroup key={index} label={item.label}>

                {item.values.map((item2, index2) => {

                    let value = item2.width + '-' + item2.height;
                
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

                {/* <Label
                    htmlFor="preset-size">Presets</Label>
                <Dropdown
                    onChange={this.handlePreset.bind(this)}>
                    <option value="null">Select...</option>
                    {presets}
                </Dropdown> */}
                <SelectInput
                    name="presets"
                    label="Presets"
                    onChange={this.handlePreset.bind(this)}>>
                    {presets}
                </SelectInput>
                <Row>
                    <Column>
                        {/* <Label
                            htmlFor="width">Width</Label>
                        <NumberField
                            id="width"
                            value={this.state.width}
                            onChange={this.handleWidth.bind(this)} /> */}
                        <SingleInput
                            type="number"
                            name="width"
                            label="Width"
                            value={this.state.width}
                            onChange={this.handleWidth.bind(this)} />
                    </Column>
                    <Column>
                        {/* <Label
                            htmlFor="height">Height</Label>
                        <NumberField
                            id="height"
                            value={this.state.height}
                            onChange={this.handleHeight.bind(this)} /> */}
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