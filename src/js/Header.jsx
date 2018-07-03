import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header className="topbar">
                <ul>
                    <li><h1>Low Poly Background</h1></li>
                    <li><a href="https://github.com/cojdev">Github</a></li>
                    <li><a href="https://codepen.io/charleso">CodePen</a></li>
                </ul>
            </header>
        );
    }
}