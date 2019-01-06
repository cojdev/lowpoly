import React from 'react';
import styled from 'styled-components';
import ControlGroup from '../widgets/ControlGroup';
import { Label, RangeSlider } from '../widgets/Fields';

const StyledControlGroup = styled(ControlGroup)`

`;

String.prototype.capitalise = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const duplicate = function(obj) {
    return Object.assign({}, obj);
};

export default class GeometryControls extends React.Component {
    constructor() {
        super();

        this.state = {
            settings: {},
            mouseX: 0,
            mouseY: 0,
        };
    }

    componentDidMount() {
        const settings = this.props.settings;

        this.setState({ settings: settings });
    }
    
    handleChange(option, e) {
        let settings = duplicate(this.state.settings);

        settings[option] = e.target.value;

        this.setState({ settings: settings });
    }

    handleBlur(option, e) {
        let value = e.target.value;
        this.props.setGeometry.call(this, option, value);
    }

    getMousePos(e) {
        this.setState({mouseX: e.pageX, mouseY: e.pageY}, () => {
            // console.log(this.state.mouseX + ', ' + this.state.mouseY);
        });
    }

    render() {

        let settings = this.state.settings;

        let options = Object.keys(settings).map((item, index) => (
            <div
                key={index}>
                <Label htmlFor={item}>{item.capitalise()}: {settings[item]}</Label>
                <RangeSlider
                    id={item}
                    min="0"
                    max="100"
                    value={settings[item] || ''}
                    onChange={this.handleChange.bind(this, item)}
                    onMouseUp={this.handleBlur.bind(this, item)} />
            </div>
        ));

        return (
            <StyledControlGroup title="Geometry"
                onMouseMove={this.getMousePos.bind(this)}>
                {options}
            </StyledControlGroup>
        );
    }
}