import React from 'react';

// widgets
import ColourPalette from '../widgets/ColourPalette';
import ControlGroup from '../widgets/ControlGroup';

import data from '../data';

export default class PaletteControls extends React.Component {

    handleSetPalette(palette) {
        this.setState({active: 0});
        this.props.setColours(palette);
    }

    render() {
        return (
            <ControlGroup title="Palettes">
                {data.hslpalettes.map((item, index) => <ColourPalette key={index} colours={item} handleSetPalette={this.handleSetPalette.bind(this)} />)}
            </ControlGroup>
        );
    }
}