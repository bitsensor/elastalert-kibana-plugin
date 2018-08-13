import React, { Component } from 'react';
import { EuiButtonToggle } from '@elastic/eui';

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleOn: false
    };
  }

  onToggleChange = (e) => {
    this.setState({ toggleOn: e.target.checked });
    this.props.handler(this.props.rule, e.target.checked);
  };

  render() {
    return (
      <EuiButtonToggle
        label={this.props.rule}
        fill={this.state.toggleOn}
        onChange={this.onToggleChange}
      />
    );
  }
}
