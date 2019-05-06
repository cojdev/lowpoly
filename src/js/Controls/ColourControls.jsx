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

const Row = styled.div`
    display: flex;
    align-items: center;
    margin: -.5ch;
`;

const SmallButton = styled.button`
    ${Button}

    display: inline-block;
    padding: .5ch .5rem;
    margin: 0 .5ch;
    width: auto;
    
    ${props => props.disabled && css`
        background: #eee;
        color: #888;
    `}
`;

const AddButton = styled.button`
    ${Button}

    display: inline-block;
    width: 2rem;
    padding: .5ch .5rem;
    height: 2rem;
    margin-left: 1ch;
`;

const ColourGroup = styled.div`
    width: 100%;
    height: 2rem;
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

const ColourBar = styled.div.attrs(props => ({
    style: {
        background: props.background,
    },
}))`
    display: block;
    width: 100%;
    height: 5px;
    border-radius: 10px;
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
        const  { settings } = this.props;
        const { active } = this.state;
        
        const newState = Object.create(null);
        if (settings !== prevProps.settings) {
            // console.log(settings);
            newState.settings = settings;
            
            if (!settings[active]) {
                console.log('not active: ', active, settings);
                newState.active = settings.length - 1;

            }

            this.setState(newState);
        }
    }

    /**
     * Add a colour to current palette
     */
    handleAddColour() {
        let settings = this.state.settings.slice();

        if (settings.length < this.state.maxColours) {
            settings.push(colour.hexToHsl(colour.getRandomHex(true)));
            this.setState({ settings: settings }, () => this.props.setColours.call(this, this.state.settings));
        }
    }

    /**
     * Select a colour in the active palette triggered by an event
     */
    setActiveColour(e) {
        this.setState({ active: parseInt(e.target.getAttribute('data-id'), 10) });
    }

    /**
     * Remove a colour from the current palette
     */
    handleRemoveColour() {
        let settings = this.state.settings.slice();
        const active = this.state.active;

        if (settings.length > 1) {
            settings.splice(active, 1);

            if (active > settings.length - 1) {
                this.setState({ active: settings.length - 1, settings: settings }, () => {
                    this.props.setColours.call(this, settings);
                });
            }
            else {
                this.setState({ settings: settings }, () => this.props.setColours.call(this, this.state.settings));
            }
        }
    }

    /**
     * Handle change in colour component values
     */
    handleChange(e) {
        const { target } = e;
        const { active } = this.state;
        const value = parseInt(target.value, 10);

        // deep clone global colours
        let colours = this.props.settings.slice().map(item => item.slice());

        switch (target.name) {
            case 'hue':
                colours[active][0] = value;
                break;
            case 'saturation':
                colours[active][1] = value;
                break;
            case 'luminosity':
                colours[active][2] = value;
                break;
        }

        this.setState({ settings: colours });
    }

    /**
     * Set the global palette value
     */
    handleMouseUp(e) {
        const colours = this.state.settings.slice();
        this.props.setColours.call(this, colours);
    }

    /**
     * Set a selected palette as the current palette
     */
    handleSetPalette(palette) {
        this.setState({ active: 0 });
        this.props.setColours(palette);
    }

    render() {
        const { settings, active } = this.state;

        // console.log(settings);

        if (settings) {
            console.log('active: ', active, settings);
            const activeColour = settings[active];
            const hsl = activeColour;

            let hueBarBg = `linear-gradient(to right,`;
            let satBarBg = `linear-gradient(to right,`;
            let lumBarBg = `linear-gradient(to right,`;

            for (let i = 0; i <= 6; i++) {
                hueBarBg += `hsl(${i * 60}, ${activeColour[1]}%,${activeColour[2]}%)${i !== 6 ? ',' : ')'}`;
                if (i < 2) {
                    satBarBg += `hsl(${activeColour[0]}, ${i * 100}%, ${activeColour[2]}%)${i !== 1 ? ',' : ')'}`;
                }
                if (i < 3) {
                    lumBarBg += `hsl(${activeColour[0]}, ${activeColour[1]}%, ${i * 50}%)${i !== 2 ? ',' : ')'}`;
                }
            }

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
                    <Row>
                        <SmallButton
                            onClick={this.handleAddColour.bind(this)}
                            disabled={settings.length < this.state.maxColours ? false : true}>Add</SmallButton>
                        <SmallButton
                            onClick={this.handleRemoveColour.bind(this)}
                            disabled={settings.length > 1 ? false : true}>Remove</SmallButton>
                    </Row>

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