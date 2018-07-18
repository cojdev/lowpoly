import React from 'react';
import * as colour from './lib/colour';

export default class ColourControls extends React.Component {
    constructor() {
        super();
        this.state = {
            maxColours: 9
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

    handleRemoveColour() {
        // let colours = this.state.colours.slice();
        let colours = this.props.settings.slice();
        console.log('REMOVE');
        console.log(colours);

        if (colours.length > 1) {
            colours.splice(-1, 1);
            console.log(colours);
            // this.setState({ colours: colours }, () => this.props.setColours.call(this, this.state.colours));
            this.props.setColours.call(this, colours);
        }
    }

    handleChangeColour(e, index) {
        // let colours = this.state.colours.slice();
        let colours = this.props.settings.slice();
        console.log('CHANGE');
        console.log(colours);


        colours[index] = e.target.value;
        console.log(colours);
        // this.setState({ colours: colours }, () => this.props.setColours.call(this, this.state.colours));
        this.props.setColours.call(this, colours);
    }

    render() {
        const settings = this.props.settings;
        let colourInputs = this.props.settings.map(
            (item, index) => (
                <input
                    type="color"
                    value={item}
                    key={index}
                    onChange={(e) => this.handleChangeColour(e, index)} />
            ));

        return (
            <div className="fieldgroup">
                <label htmlFor="numColours">Colours ({settings.length})<span id="num-colours"></span></label>
                <button
                    onClick={this.handleRemoveColour.bind(this)}
                    style={{width: 'unset'}}
                    disabled={settings.length > 1 ? false : true}>-</button>
                <button
                    onClick={this.handleAddColour.bind(this)}
                    style={{width: 'unset'}}
                    disabled={settings.length < this.state.maxColours ? false : true}>+</button>
                <br />
                {/* <!-- Container for dynamically generated color input elememets --> */}
                <div id="colour-div">
                    {colourInputs}
                </div>
            </div>
        );
    }
}