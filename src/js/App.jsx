import React from 'react';

// Components
import Header from './Header';
import Display from './Display';
import Controls from './Controls';

// Helpers
import uuid from './lib/helpers';

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
                    variance: 40,
                    cellSize: 40,
                    depth: 40,
                },
                
                colour: ["#22bbee", "#8855cc", "#ee2266", "#ee7722"]
            },

            presets: [
                {
                    width:1280,
                    height: 720,
                    label: '1280x720',
                },
                {
                    width:1366,
                    height: 768,
                    label: '1366x768',
                },
                {
                    width:1920,
                    height: 1080,
                    label: '1920x1080',
                },
                {
                    width:3840,
                    height: 2160,
                    label: '3840x2160 (4K)',
                },
                {
                    width:640,
                    height: 1152,
                    label: 'iPhone 5/5s',
                },
                {
                    width:750,
                    height: 1334,
                    label: 'iPhone 6/7/8',
                },
                {
                    width:1080,
                    height: 1920,
                    label: 'iPhone 6+/7+/8+',
                },
            ],

            settings: {}
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

        this.setState({settings: settings});
    }

    render() {
        
        const settings = this.state.settings;
        const presets = this.state.presets;

        return (
            <div
                className="container">
                <Header />
                <Display
                    height={settings.dimensions.height}
                    width={settings.dimensions.width} />
                <Controls
                    settings={settings}
                    presets={presets}
                    setDimensions={this.setDimensions.bind(this)} />
            </div>
        );
    }
}