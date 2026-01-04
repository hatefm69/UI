import React, { Component } from "react";

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <a
        className={this.props.buttonClass}
        onClick={this.props.onclick}
        style={this.props.style}
      >
        <i
          className={this.props.iconLeftClass}
          style={{ marginBottom: "5px" }}
        />
        {this.props.text}
        <i className={this.props.iconRightClass} />
      </a>
    );
  }
}
