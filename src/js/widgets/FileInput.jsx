import React from 'react';

export default class FileInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    this.setState({
      value: (this.props.value || this.state.value),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <input
        type="file"
        id="avatar"
        name="avatar"
        value={this.state.value}
        accept="image/png, image/jpeg, image/gif" />
    );
  }
}
