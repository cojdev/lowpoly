import React from 'react';

export default class GeometryControls extends React.Component {
    render() {

        let settings = this.props.settings;

        return (
            <div
                className="fieldgroup">
                <label
                    htmlFor="variance">Variance</label>
                <input
                    type="range"
                    id="variance"
                    value={settings.value}
                    min={settings.min}
                    max={settings.max} />

                <label
                    htmlFor="cell-size">Cell Size</label>
                <input
                    type="range"
                    id="cell-size" />

                <label
                    htmlFor="oamount">Depth</label>
                <input
                    type="range"
                    id="oamount" />
            </div>
        );
    }
}