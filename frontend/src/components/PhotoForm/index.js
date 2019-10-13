import React from "react";
import TextForm from "./../TextForm";

import "./styles.css";

const PhotoGroup = ({ room, image_urls }) => {
  return (
    <div className="photoGroup">
      <h3>{room}</h3>
      <div className="scrollmenu">
        {image_urls.map(item => (
          <img className="roomImg" src={item} />
        ))}
      </div>
      <hr />
    </div>
  );
};

class PhotoForm extends TextForm {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="photoForm">
          {this.state.photoGroups.map(item => PhotoGroup(item))}
        </div>
      </div>
    );
  }
}

export default PhotoForm;
