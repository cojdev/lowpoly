// Helpers
export function uuid(len) {
    let length = len || 6;
    let charCodes = [];
    let string = '';

    for (let i = 0; i < 10; i++) {
        charCodes.push(48 + i);
        charCodes.push(97 + i);
    }
    for (let i = 0; i < 16; i++) {
        charCodes.push(107 + i);
    }

    for (let i = 0; i < length; i++) {
        let charIndex = Math.floor(Math.random() * charCodes.length);
        string = string + String.fromCharCode(charCodes[charIndex]);
    }

    return string;
}
import React from 'react';

export default class Controls extends React.Component {
    render() {
        let settings = this.props.settings;
        let presets = this.props.presets;
        let setDimensions = this.props.setDimensions.bind(this);

        return (
            <section className="controls">
                <DimensionControls
                    settings={settings.dimension}
                    presets={presets}
                    setDimensions={setDimensions} />
                <GeometryControls
                    settings={settings.geometry} />
                <ColourControls
                    settings={settings.colour} />
                <div className="section">
                    <a id="save" className="button" download="lowpoly.png">Download Image</a>
                </div>

            </section>
        );
    }
}
import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header className="topbar">
                <ul>
                    <li><h1>Low Poly Background</h1></li>
                    <li><a href="https://github.com/cojdev">Github</a></li>
                    <li><a href="https://codepen.io/charleso">CodePen</a></li>
                </ul>
            </header>
        );
    }
}
import React from 'react';

export default class Display extends React.Component {
    componentDidMount() {
        const cvs = this.refs.canvas1,
            cvs2 = this.refs.canvas2;
        
        const ctx = cvs.getContext('2d'),
            ctx2 = cvs2.getContext('2d');
        
    }

    drawCanvas(canvas, canvas2) {
        const drawGradient = function (context, canvas) {

            const self = this;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.globalCompositeOperation = "multiply";
            var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    
            // Duskish gradient
            // dusk = {
            // 	colours: ["#0e1b32","#c28993","#ffc7af"],
            // 	stops: [0, 0.8, 1]
            // };
            
            // draw gradient
            var inputs = ["#0e1b32", "#c28993", "#ffc7af"];
            for (var i = 0; i < inputs.length; i++) {
                if (inputs.length > 1) {
                    gradient.addColorStop(i / (inputs.length - 1), inputs[i]);
                    console.log(inputs[i]);
                } else {
                    gradient = inputs[i];
                }
                colours[i] = inputs[i];
            }
            context.fillStyle = gradient;
            context.beginPath();
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.closePath();
            context.fill();
            

            context.beginPath();
            var overlay = context.createLinearGradient(0, 0, 0, cvs.height);
            overlay.addColorStop(0, "#fff");
            overlay.addColorStop(1, "#ccc");
            context.fillStyle = overlay;
            context.fillRect(0, 0, cvs.width, cvs.height);
            context.closePath();
            context.fill();
            context.globalCompositeOperation = "source-over";

            // use image instead of gradient
            // ctx.drawImage(base_image, 0, 0);

            // hidden canvas
            if (context == self.ctx2) { imgd = context; }

            // 
            else if (imgd.getImageData(0, 0, 1, 1).data[3] < 255 || imgd.getImageData(canvas.width - 1, canvas.height - 1, 1, 1).data[3] < 255) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }

    render() {
        const width = this.props.width,
            height = this.props.height;

        return (
            <div
                className="display">
                <canvas
                    ref="canvas1"
                    className="canvas1"
                    width={width}
                    height={height}></canvas>
                <canvas
                    ref='canvas2'
                    className="canvas2"
                    width={width}
                    height={height}></canvas>
            </div>
        );
    }
}
import React from 'react';

// Components
import Header from './Header';
import Display from './Display';
import Controls from './Controls';

// Helpers
import uuid from './lib/helpers';

class App extends React.Component {
    constructor() {
        super();
        this.state = {

            defaults: {
                dimension: {
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
        this.setState({dimensions: obj});
    }

    render() {
        
        const settings = this.state.settings;
        const presets = this.state.presets;

        return (
            <div
                className="container">
                <Header />
                <Display
                    height={this.state.dimensions.height}
                    width={this.state.dimensions.width} />
                <Controls
                    settings={this.state.settings}
                    presets={this.state.presets}
                    setDimensions={this.setDimensions.bind(this)} />
            </div>
        );
    }
}
//# sourceMappingURL=react.js.map
