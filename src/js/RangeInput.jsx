import React from 'react';
import { RangeSlider } from './widgets/Fields';

export default class RangeInput extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            
        }
    }

    componentDidMount() {
        this.setState({
            value: (this.props.value !== undefined ? this.props.value : this.state.value),
            min: (this.props.min !== undefined ? this.props.min : this.state.min),
            max: (this.props.max !== undefined ? this.props.max : this.state.max),
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleMouseUp(e) {
        console.log('up');
        this.props.handleMouseUp.call(this, e.target.value, e.target.name);
    }

    render() {
        return (
            <RangeSlider
                value={this.state.value}
                min={this.props.min !== undefined ? this.props.min : 0}
                max={this.props.max !== undefined ? this.props.max : 100}
                name={this.props.name !== undefined ? this.props.name : ''}
                onChange={this.handleChange.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)} />
        );
    }
}