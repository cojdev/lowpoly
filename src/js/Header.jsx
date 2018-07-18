import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header className="topbar">
                <ul>
                    <li><h1>Low Poly Background</h1></li>
                    <li><a href="https://github.com/cojdev">Github</a></li>
                    <li><a href="https://codepen.io/cojdev">CodePen</a></li>
                    <li><a className="github-button" href="https://github.com/cojdev/lowpoly" data-icon="octicon-star" data-show-count="true" aria-label="Star cojdev/lowpoly on GitHub">Star</a></li>
                </ul>
            </header>
        );
    }
}