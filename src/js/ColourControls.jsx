import React from 'react';
import styled, { css } from 'styled-components';
import ControlGroup from './widgets/ControlGroup';

import * as colour from './common/colour';
import ColourInput from './ColourInput';
import { Label } from './widgets/Fields';
import RangeInput from './RangeInput';

const StyledControlGroup = styled(ControlGroup)`

`;

const SmallButton = styled.button`
    display: inline-block;
	border-radius:100px;
	padding: .5em;
	text-align: center;
	line-height: 1;
	color: #e24;
	background: transparent;
    border: 1px solid #eee;
    
    ${props => props.disabled && css`
        background: #eee;
    `}
`;

const ColourGroup = styled.div`
    width: 100%;
    height: 30px;
    position: relative;
    margin: 1em 0;
    overflow: hidden;
    border-radius: 3px;
    box-shadow: inset 0 5px 15px rgba(0,0,0,.1);
`;

const ColourGroupInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* z-index: -1; */
    display: flex;
    background: #ccc;
`;

const ColourBar = styled.div`
    display: block;
    width: 100%;
    height: 5px;
    background: ${props => props.background || '#ccc'};
`;

export default class ColourControls extends React.Component {
    constructor() {
        super();
        this.state = {
            maxColours: 12,
            active: 0,
        }
    }

    componentWillMount() {
        this.setState({ colours: this.props.settings });
    }

    handleAddColour() {
        
        // let colours = this.state.colours.slice();
        let colours = this.props.settings.slice();
        console.log('ADD');
        console.log(colours);

        if (colours.length < this.state.maxColours) {
            colours.push(colour.getRandom(1));
            // this.setState({ colours: colours }, () => this.props.setColours.call(this, this.state.colours));
            this.props.setColours.call(this, colours);
        }
        console.log(colours);
        

    }

    setActiveColour(e) {
        this.setState({ active: parseInt(e.target.getAttribute('data-id'), 10)});
    }

    handleRemoveColour() {
        // let colours = this.state.colours.slice();
        let colours = this.props.settings.slice();
        const active = this.state.active;
        console.log('REMOVE');
        console.log(colours);

        if (colours.length > 1) {
            colours.splice(-1, 1);
            console.log(colours);

            if (active > colours.length - 1) {
                this.setState({active: colours.length - 1}, () => {
                    this.props.setColours.call(this, colours);
                });
            }
            else {
                this.props.setColours.call(this, colours);
            }
        }
    }

    handleChangeColour(index, hexValue) {
        // let colours = this.state.colours.slice();
        let colours = this.props.settings.slice();
        // colour.hexToRgb(settings[active])
        colour.hexToRgb = hexValue;
        console.log('CHANGE');
        console.log(colours);

        colours[index] = hexValue;
        console.log(colours);
        // this.setState({ colours: colours }, () => this.props.setColours.call(this, this.state.colours));
        this.props.setColours.call(this, colours);
    }

    handleRgbSet(value, name) {
        value = parseInt(value, 10);
        console.log(value);
        let colours = this.props.settings.slice();
        console.log('Set');
        console.log(colours);

        const rgb = colour.hexToRgb(colours[this.state.active]);
        if (name === 'red') {
            colours[this.state.active] = colour.rgbToHex([value,rgb[1],rgb[2]]);
        } else if (name === 'green') {
            colours[this.state.active] = colour.rgbToHex([rgb[0],value,rgb[2]]);
        } else if (name === 'blue') {
            colours[this.state.active] = colour.rgbToHex([rgb[0],rgb[1],value]);
        }
        
        console.log(colours);
        this.props.setColours.call(this, colours);

    }

    render() {
        const { settings } = this.props;
        const { active } = this.state;

        let colourInputs = settings.map(
            (item, index) => (
                <ColourInput
                    value={item}
                    key={index}
                    index={index}
                    active={active === index}
                    handleChangeColour={this.handleChangeColour.bind(this)}
                    setActiveColour={this.setActiveColour.bind(this)}></ColourInput>
            ));

        return (
            <ControlGroup title="Colour">
                <Label htmlFor="numColours">Colours ({settings.length})<span id="num-colours"></span></Label>
                <SmallButton
                    onClick={this.handleRemoveColour.bind(this)}
                    disabled={settings.length > 1 ? false : true}>Remove -</SmallButton>
                <SmallButton
                    onClick={this.handleAddColour.bind(this)}
                    disabled={settings.length < this.state.maxColours ? false : true}>Add +</SmallButton>
                <br />
                
                <ColourGroup>
                    <ColourGroupInner>
                        {colourInputs}
                    </ColourGroupInner>
                </ColourGroup>
                <Label>
                    Red: {colour.hexToRgb(settings[active])[0]},
                </Label>
                <RangeInput
                    min="0"
                    max="255"
                    name="red"
                    value={colour.hexToRgb(settings[active])[0]}
                    handleMouseUp={this.handleRgbSet.bind(this)} />
                <ColourBar background={
                    `linear-gradient(to right, rgb(0, ${colour.hexToRgb(settings[active])[1]}, ${colour.hexToRgb(settings[active])[2]}),  rgb(255, ${colour.hexToRgb(settings[active])[1]}, ${colour.hexToRgb(settings[active])[2]}))`
                    } />

                <Label>
                    Green: {colour.hexToRgb(settings[active])[1]},
                </Label>
                <RangeInput
                    min="0"
                    max="255"
                    name="green"
                    value={colour.hexToRgb(settings[active])[1]}
                    handleMouseUp={this.handleRgbSet.bind(this)} />
                <ColourBar background={
                    `linear-gradient(to right, rgb(${colour.hexToRgb(settings[active])[0]}, 0, ${colour.hexToRgb(settings[active])[2]}),  rgb(${colour.hexToRgb(settings[active])[0]}, 255, ${colour.hexToRgb(settings[active])[2]}))`
                    } />

                <Label>
                    Blue: {colour.hexToRgb(settings[active])[2]}
                </Label>
                <RangeInput
                    min="0"
                    max="255"
                    name="blue"
                    value={colour.hexToRgb(settings[active])[2]}
                    handleMouseUp={this.handleRgbSet.bind(this)} />
                <ColourBar background={
                    `linear-gradient(to right, rgb(${colour.hexToRgb(settings[active])[0]}, ${colour.hexToRgb(settings[active])[1]}, 0),  rgb(${colour.hexToRgb(settings[active])[0]}, ${colour.hexToRgb(settings[active])[1]}, 255))`
                    } />
            </ControlGroup>
        );
    }
}