import React, { Component } from "react";
import TextForm from "./../TextForm";

import "./styles.css";

class TextArea extends TextForm {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return <p>{this.props.adText}</p>;
  }
}

export default TextArea;
