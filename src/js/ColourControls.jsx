import React from 'react';

export default class ColourControls extends React.Component {
    render() {
        return (
            <div className="fieldgroup">
                <label htmlFor="numColours">No. of colours: <span id="num-colours"></span></label>
                <input type="range" id="numColours" /><br />
                {/* <!-- Container for dynamically generated color input elememets --> */}
                <div id="colour-div"></div>
            </div>
        );
    }
}