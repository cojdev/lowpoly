import React from 'react';

import DimensionControls from './DimensionControls';
import GeometryControls from './GeometryControls';
import ColourControls from './ColourControls';

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