import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

// Components
import Display from './Display';
import Controls from './Controls';

// Helpers
import data from './data';
import theme from './common/theme';

const GlobalStyles = createGlobalStyle`
    *,*::before,*::after {
        box-sizing: border-box;
    }

    html,
    body {
        margin: 0;
        padding: 0;
    }

    html {
        font-family: ${theme.fonts.base};
        color: #333;
        background: #f8f8f8;
        font-size: 16px;
    }

    a {
        color: #48b;
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }

    button {
        outline: none !important;
    }
`;

const Container = styled.div`

`;

const StyledControls = styled(Controls)`

    @media screen and (max-width: 800px) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        transform: translateX(calc(100% - 3em));
        transition: transform 300ms ease;

        ${props => props.open && css`
            transform: none;
        `}
    }
`;

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            defaults: {
                dimensions: {
                    width: 1280,
                    height: 720,
                },

                geometry: {
                    variance: 35,
                    cellSize: 50,
                    depth: 20,
                },

                colour: data.palettes[0],

                image: null,
                useImage: false,
            },
            presets: data.presets,
            settings: {},
            output: '',
            controlsOpen: false,
        };

        this.setters = {
            setDimensions: this.setDimensions.bind(this),
            setColours: this.setColours.bind(this),
            setGeometry: this.setGeometry.bind(this),
            setImage: this.setImage.bind(this),
            setUseImage: this.setUseImage.bind(this),
        }

        
        this.toggleControls = this.toggleControls.bind(this);
    }

    componentWillMount() {
        let defaults = Object.assign({}, this.state.defaults);
        this.setState({ settings: defaults });
    }

    toggleControls() {
        this.setState({ controlsOpen: !this.state.controlsOpen },()=>{console.log(this.state.controlsOpen)});
    }

    /**
     * set dimensions
     * @param {object} obj 
     */
    setDimensions(obj) {

        let settings = Object.assign({}, this.state.settings);
        settings.dimensions = obj;
        this.setState({ settings: settings });
    }

    /**
     * sets the colours in the palette
     * @param {array} arr array of colour hex values
     */
    setColours(arr) {

        let settings = Object.assign({}, this.state.settings);
        console.log(arr);
        settings.colour = arr;
        this.setState({ settings: settings });
    }

    /**
     * set geometry
     * @param {number} option attribute being set
     * @param {number} value value
     */
    setGeometry(option, value) {

        let settings = Object.assign({}, this.state.settings);
        settings.geometry[option] = parseInt(value);
        this.setState({ settings: settings });
    }

    setImage(image) {

        let settings = Object.assign({}, this.state.settings);
        settings.image = image;
        this.setState({ settings: settings });
    }

    setUseImage(boolean) {

        let settings = Object.assign({}, this.state.settings);
        settings.useImage = boolean;
        this.setState({ settings: settings });
    }

    /**
     * Updates the output dataURI in state
     * @param {string} value The data URL for the generated canvas 
     */
    updateOutput(value) {

        this.setState({ output: value });
    }

    render() {

        const settings = this.state.settings;
        const presets = this.state.presets;
        const output = this.state.output;

        return (
            <Container>
                <GlobalStyles />
                <Display
                    settings={settings}
                    updateOutput={this.updateOutput.bind(this)} />
                <StyledControls
                    settings={settings}
                    presets={presets}
                    output={output}
                    open={this.state.controlsOpen}
                    toggleControls={this.toggleControls}
                    { ...this.setters } />
            </Container>
        );
    }
}