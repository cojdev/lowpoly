import React from 'react';

String.prototype.capitalise = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const duplicate = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

export default class GeometryControls extends React.Component {
    constructor() {
        super();

        this.state = {
            settings: {}
        };
    }

    componentDidMount() {
        const settings = this.props.settings;

        this.setState({ settings: settings });
    }

    /**
     * 
     * @param {string} option 
     */
    handleChange(option, e) {
        let settings = duplicate(this.state.settings);

        settings[option] = e.target.value;

        this.setState({ settings: settings });
    }

    handleBLur(option, e) {
        let value = e.target.value;
        this.props.setGeometry.call(this, option, value);
    }
    render() {

        let settings = this.state.settings;

        let options = ['variance','cellSize','depth'].map((item, index) => (
            <div
                key={index}>
                <label htmlFor={item}>{item.capitalise()}</label>
                <input type="range"
                id={item}
                min="0"
                max="100"
                value={settings[item] || ''}
                onChange={this.handleChange.bind(this, item)}
                onMouseUp={this.handleBLur.bind(this, item)} />
            </div>
        ));

        return (
            <div
                className="fieldgroup">
                {options}
            </div>
        );
    }
}