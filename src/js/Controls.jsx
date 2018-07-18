import React from 'react';

import DimensionControls from './DimensionControls';
import GeometryControls from './GeometryControls';
import ColourControls from './ColourControls';

export default class Controls extends React.Component {
    // handleSaveImage() {

    // }

    render() {
        let settings = this.props.settings;
        let presets = this.props.presets;
        let setDimensions = this.props.setDimensions.bind(this);
        let setColours = this.props.setColours.bind(this);

        return (
            <section className="controls">
                <DimensionControls
                    settings={settings.dimensions}
                    presets={presets}
                    setDimensions={setDimensions} />
                <GeometryControls
                    settings={settings.geometry}
                    setGeometry={this.props.setGeometry.bind(this)} />
                <ColourControls
                    settings={settings.colour}
                    setColours={setColours} />
                <div className="section">
                    <a 
                        className="button"
                        href={this.props.output}
                        download="lowpoly.png">Download Image</a>
                </div>

            </section>
        );
    }
}