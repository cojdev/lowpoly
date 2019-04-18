import React from 'react';

import styled, { css } from 'styled-components';
import * as colour from '../common/colour';

// widgets
import ColourInput from '../widgets/ColourInput';
import { Label } from '../widgets/Fields';
import RangeInput from '../widgets/RangeInput';
import ColourPalette from '../widgets/ColourPalette';
import ControlGroup from '../widgets/ControlGroup';
import { Button } from '../widgets/Button';

import data from '../data';

const SmallButton = styled.button`
    ${Button}

    display: inline-block;
    width: 2rem;
    padding: .5ch .5rem;
    margin-right: 1ch;
    
    ${props => props.disabled && css`
        background: #eee;
        color: #888;
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

const Heading = styled.h3``;

export default class ColourControls extends React.Component {
    constructor() {
        super();
        this.state = {
            maxColours: 12,
            active: 0,
            h: null,
            s: null,
            l: null,
            settings: null,
        }
    }

    componentDidMount() {
        const settings = this.props.settings.slice();

        this.setState({ settings: settings });
    }

    componentDidUpdate(prevProps) {
        if (this.props.settings !== prevProps.settings) {
            // console.log(this.props.settings);
            this.setState({ settings: this.props.settings });
        }
    }

    handleAddColour() {
        
        let settings = this.state.settings.slice();

        if (settings.length < this.state.maxColours) {
            settings.push(colour.getRandomHex(true));
            this.setState({ settings: settings }, () => this.props.setColours.call(this, this.state.settings));
        }
    }

    setActiveColour(e) {
        this.setState({ active: parseInt(e.target.getAttribute('data-id'), 10)});
    }

    handleRemoveColour() {

        let settings = this.state.settings.slice();
        const active = this.state.active;

        if (settings.length > 1) {
            settings.splice(-1, 1);

            if (active > settings.length - 1) {
                this.setState({active: settings.length - 1, settings: settings}, () => {
                    this.props.setColours.call(this, settings);
                });
            }
            else {
                this.setState({ settings: settings }, () => this.props.setColours.call(this, this.state.settings));
            }
        }
    }

    handleChangeColour(index, hexValue) {
        // let colours = this.state.colours.slice();
        let colours = this.props.settings.slice();
        // colour.hexToRgb(settings[active])
        colour.hexToRgb = hexValue;

        colours[index] = hexValue;
        // console.log(colours);
        // this.setState({ colours: colours }, () => this.props.setColours.call(this, this.state.colours));
        this.props.setColours.call(this, colours);
    }

    // 
    handleRgbSet(value, name) {
        value = parseInt(value, 10);
        // console.log(value);
        let colours = this.props.settings.slice();
        // console.log('Set');
        // console.log(colours);

        const rgb = colour.hexToRgb(colours[this.state.active]);
        if (name === 'red') {
            colours[this.state.active] = colour.rgbToHex([value,rgb[1],rgb[2]]);
        } else if (name === 'green') {
            colours[this.state.active] = colour.rgbToHex([rgb[0],value,rgb[2]]);
        } else if (name === 'blue') {
            colours[this.state.active] = colour.rgbToHex([rgb[0],rgb[1],value]);
        }
        
        this.props.setColours.call(this, colours);

    }

    // 
    handleChange(e) {
        const value = parseInt(e.target.value, 10);
        let colours = this.props.settings.slice();

        const hsl = colour.hexToHsl(colours[this.state.active]);
        
        if (e.target.name === 'hue') {
            colours[this.state.active] = colour.hslToHex([value,hsl[1],hsl[2]]);
        } else if (e.target.name === 'saturation') {
            colours[this.state.active] = colour.hslToHex([hsl[0],value,hsl[2]]);
        } else if (e.target.name === 'luminosity') {
            colours[this.state.active] = colour.hslToHex([hsl[0],hsl[1],value]);
        }

        this.setState({settings: colours});
    }

    handleMouseUp(e) {
        const colours = this.state.settings.slice();
        this.props.setColours.call(this, colours);
    }

    handleSetPalette(palette) {
        this.setState({active: 0});
        this.props.setColours(palette);
    }

    render() {
        const { settings } = this.state;
        const { active } = this.state;

        // console.log(settings);

        if (settings) {
            const hsl = colour.hexToHsl(settings[active]);

            // console.log(settings, hsl);

            const hueBarBg = `linear-gradient(
                to right,
                hsl(0, ${hsl[1]}%,${hsl[2]}%), 
                hsl(60, ${hsl[1]}%,${hsl[2]}%), 
                hsl(120, ${hsl[1]}%,${hsl[2]}%), 
                hsl(180, ${hsl[1]}%,${hsl[2]}%), 
                hsl(240, ${hsl[1]}%,${hsl[2]}%), 
                hsl(300, ${hsl[1]}%,${hsl[2]}%), 
                hsl(360, ${hsl[1]}%, ${hsl[2]}%)
            )`;

            const satBarBg = `linear-gradient(
                to right,
                hsl(${hsl[0]}, 0%, ${hsl[2]}%),
                hsl(${hsl[0]}, 100%, ${hsl[2]}%)
            )`;

            const lumBarBg = `linear-gradient(
                to right,
                hsl(${hsl[0]}, ${hsl[1]}%, 0%),
                hsl(${hsl[0]}, ${hsl[1]}%, 50%),
                hsl(${hsl[0]}, ${hsl[1]}%, 100%)
            )`;

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
                        disabled={settings.length > 1 ? false : true}>-</SmallButton>
                    <SmallButton
                        onClick={this.handleAddColour.bind(this)}
                        disabled={settings.length < this.state.maxColours ? false : true}>+</SmallButton>
                    {settings[active]}
                    <br/>

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
                        onChange={this.handleChange.bind(this)}
                        onMouseUp={this.handleMouseUp.bind(this)} />
                    <ColourBar background={hueBarBg} />

                    <Label>
                        saturation: {hsl[1]}
                    </Label>
                    <RangeInput
                        min="0"
                        max="100"
                        name="saturation"
                        value={hsl[1]}
                        onChange={this.handleChange.bind(this)}
                        onMouseUp={this.handleMouseUp.bind(this)} />
                    <ColourBar background={satBarBg} />

                    <Label>
                        luminosity: {hsl[2]}
                    </Label>
                    <RangeInput
                        min="0"
                        max="100"
                        name="luminosity"
                        value={hsl[2]}
                        onChange={this.handleChange.bind(this)}
                        onMouseUp={this.handleMouseUp.bind(this)} />
                    <ColourBar background={lumBarBg} />
                </ControlGroup>
            );
        }

        return <div>Loading...</div>;
    }
}