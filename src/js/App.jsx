import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Components
import Header from './Header';
import Display from './Display';
import Controls from './Controls';

// Helpers
import uuid from './common/helpers';

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
        font-family: 'Nunito Sans', sans-serif;
        color: #333;
        background: #ccc;
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

                colour: ["#22bbee", "#8855cc", "#ee2266", "#ee7722"],
            },

            presets: [
                {
                    label: 'Mobile',
                    values: [
                        {
                            width: 640,
                            height: 1152,
                            label: 'iPhone 5/5s',
                        },
                        {
                            width: 750,
                            height: 1334,
                            label: 'iPhone 6/7/8',
                        },
                        {
                            width: 1080,
                            height: 1920,
                            label: 'iPhone 6+/7+/8+',
                        },
                        {
                            width: 1125,
                            height: 2436,
                            label: 'iPhone X',
                        },
                        {
                            width: 1440,
                            height: 2960,
                            label: 'Samsung Galaxy S8/S9',
                        },
                    ]
                },
                {
                    label: 'Desktop',
                    values: [
                        {
                            width: 1280,
                            height: 720,
                            label: '1280x720',
                        },
                        {
                            width: 1366,
                            height: 768,
                            label: '1366x768',
                        },
                        {
                            width: 1920,
                            height: 1080,
                            label: '1920x1080',
                        },
                        {
                            width: 3840,
                            height: 2160,
                            label: '3840x2160 (4K)',
                        },
                    ],
                }
            ],

            settings: {},

            output: '',
        };
    }

    componentWillMount() {
        let defaults = JSON.parse(JSON.stringify(this.state.defaults));
        this.setState({ settings: defaults });
    }

    setDimensions(obj) {
        console.log('setDimensions');

        let settings = JSON.parse(JSON.stringify(this.state.settings));

        settings.dimensions = obj;

        this.setState({ settings: settings });
    }

    setColours(arr) {
        // console.log('setColours');

        let settings = JSON.parse(JSON.stringify(this.state.settings));

        settings.colour = arr;

        this.setState({ settings: settings });
    }

    setGeometry(option, value) {

        let settings = JSON.parse(JSON.stringify(this.state.settings));

        settings.geometry[option] = parseInt(value);

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
                <Controls
                    settings={settings}
                    presets={presets}
                    output={output}
                    setDimensions={this.setDimensions.bind(this)}
                    setColours={this.setColours.bind(this)}
                    setGeometry={this.setGeometry.bind(this)} />
            </Container>
        );
    }
}