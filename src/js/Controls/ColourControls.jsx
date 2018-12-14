import React from 'react';
import styled, { css } from 'styled-components';
import ControlGroup from '../widgets/ControlGroup';

import * as colour from '../common/colour';
import ColourInput from '../widgets/ColourInput';
import { Label } from '../widgets/Fields';
import RangeInput from '../widgets/RangeInput';
import ColourPalette from '../widgets/ColourPalette';
import data from '../data';

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
            h: null,
            s: null,
            l: null,
        }
    }

    componentDidMount() {
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

    // 
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

    // 
    handleHslSet(value, name) {
        value = parseInt(value, 10);
        console.log(value);
        let colours = this.props.settings.slice();
        console.log(colours);

        const hsl = colour.hexToHsl(colours[this.state.active]);
        console.log('hsl', hsl);
        if (name === 'hue') {
            colours[this.state.active] = colour.hslToHex([value,hsl[1],hsl[2]]);
        } else if (name === 'saturation') {
            colours[this.state.active] = colour.hslToHex([hsl[0],value,hsl[2]]);
        } else if (name === 'luminosity') {
            colours[this.state.active] = colour.hslToHex([hsl[0],hsl[1],value]);
        }
        
        console.log(colours);
        this.props.setColours.call(this, colours);

    }

    handleSetPalette(palette) {
        this.setState({active: 0});
        this.props.setColours(palette);
    }

    render() {
        const { settings } = this.props;
        const { active } = this.state;

        const hsl = colour.hexToHsl(settings[active]);

        console.log(settings);

        let colourInputs = settings.map(
            (item, index) => (
                <ColourInput
                    value={item}
                    key={index}
                    index={index}
                    active={active === index}
                    setActiveColour={this.setActiveColour.bind(this)}></ColourInput>
            ));

        return (
            <ControlGroup title="Colours">
                <SmallButton
                    onClick={this.handleRemoveColour.bind(this)}
                    disabled={settings.length > 1 ? false : true}>Remove -</SmallButton>
                <SmallButton
                    onClick={this.handleAddColour.bind(this)}
                    disabled={settings.length < this.state.maxColours ? false : true}>Add +</SmallButton>
                    {settings[active]}
                <br />
                
                <ColourGroup>
                    <ColourGroupInner>
                        {colourInputs}
                    </ColourGroupInner>
                </ColourGroup>
                <Label>
                    hue: {hsl[0]}
                </Label>
                <RangeInput
                    min="0"
                    max="360"
                    name="hue"
                    value={hsl[0]}
                    handleMouseUp={this.handleHslSet.bind(this)} />
                <ColourBar background={
                    `linear-gradient(
                        to right,
                        hsl(0, ${hsl[1]}%,${hsl[2]}%), 
                        hsl(60, ${hsl[1]}%,${hsl[2]}%), 
                        hsl(120, ${hsl[1]}%,${hsl[2]}%), 
                        hsl(180, ${hsl[1]}%,${hsl[2]}%), 
                        hsl(240, ${hsl[1]}%,${hsl[2]}%), 
                        hsl(300, ${hsl[1]}%,${hsl[2]}%), 
                        hsl(360, ${hsl[1]}%, ${hsl[2]}%))`
                    } />

                <Label>
                    saturation : {hsl[1]}
                </Label>
                <RangeInput
                    min="0"
                    max="100"
                    name="saturation"
                    value={hsl[1]}
                    handleMouseUp={this.handleHslSet.bind(this)} />
                <ColourBar background={
                    `linear-gradient(
                        to right,
                        hsl(${hsl[0]}, 0%, ${hsl[2]}%),
                        hsl(${hsl[0]}, 100%, ${hsl[2]}%))`
                    } />

                <Label>
                    luminosity: {hsl[2]}
                </Label>
                <RangeInput
                    min="0"
                    max="100"
                    name="luminosity"
                    value={hsl[2]}
                    handleMouseUp={this.handleHslSet.bind(this)} />
                <ColourBar background={
                    `linear-gradient(
                        to right,
                        hsl(${hsl[0]}, ${hsl[1]}%, 0%),
                        hsl(${hsl[0]}, ${hsl[1]}%, 50%),
                        hsl(${hsl[0]}, ${hsl[1]}%, 100%))`
                    } />
                <Label>Palettes</Label>
                {data.palettes.map((item, index) => <ColourPalette key={index} colours={item} handleSetPalette={this.handleSetPalette.bind(this)} />)}
            </ControlGroup>
        );
    }
}