import React from 'react';

export default class DimensionControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
        }
    }

    componentDidMount() {

        this.setState({
            height: this.props.settings.height,
            width: this.props.settings.width
        })
    }

    handlePreset(e) {
        let dims = e.target.value.split('-');

        this.setState({
            width: dims[0],
            height: dims[1],
        })
    }

    handleHeight(e) {
        this.setState({height: e.target.value});
    }

    handleWidth(e) {
        this.setState({width: e.target.value});
    }

    handleSubmit(e) {
        this.props.setDimensions.call(this, this.state);
        console.log('handleSubmit');
        e.preventDefault();
    }

    render() {
        const presets = this.props.presets.map((item, index) => {
            let value = item.width + '-' + item.height;
            return (
                <option
                    value={value}
                    key={index}>{item.label}</option>
            );
        });

        return (
            <div className="fieldgroup">
                <label
                    htmlFor="preset-size">Presets</label>
                <select
                    id="preset-size"
                    onInput={this.handlePreset.bind(this)}>
                    {presets}
                </select>
                <div
                    className="row">
                    <div
                        className="_50">
                        <label
                            htmlFor="width">Width</label>
                        <input
                            type="number"
                            id="width"
                            value={this.state.width}
                            onChange={this.handleWidth.bind(this)} />
                    </div>
                    <div
                        className="_50">
                        <label
                            htmlFor="height">Height</label>
                        <input
                            type="number"
                            id="height"
                            value={this.state.height}
                            onChange={this.handleHeight.bind(this)} />
                    </div>
                </div>
                <button
                    id="size-btn"
                    onClick={this.handleSubmit.bind(this)}>Set</button>
            </div>
        );
    }
}