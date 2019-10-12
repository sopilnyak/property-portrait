import React, { Component } from "react";
import Button from "./../Button";

import "./styles.css";

class TextForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adText: "Ad text here"
    };

    this.formChange = this.formChange.bind(this);
  }

  formChange = event => {
    this.setState({ adText: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = new FormData(event.target);
    let json_data = {};
    form.forEach(function(value, key) {
      json_data[key] = value;
    });

    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "http://localhost:5000/api/description", true /*async*/);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    let this_ = this;
    xhr.onload = function() {
      this_.setState({ adText: xhr.response.description });
    };
    xhr.send(JSON.stringify({ form: json_data, image_keys: [] }));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="infoForm">
            <div className="secondColumn">
              {this.state.adText}
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Full name"
              />{" "}
              <br />
              <input
                name="location"
                type="text"
                id="location"
                placeholder="Location"
              />{" "}
              <br />
              <input
                name="size"
                type="text"
                id="size"
                placeholder="Area"
              />{" "}
              <br />
              <input
                name="phone"
                type="text"
                id="phone"
                placeholder="Phone"
              />{" "}
              <br />
              <select id="type" name="type" placeholder="Type">
                {" "}
                <br />
                <option value="flat">Flat</option>
                <option value="house">House</option>
                <option value="duplex">Duplex</option>
                <option value="penthouse">Penthouse</option>
              </select>{" "}
              <br />
              Bedrooms <br />
              <div className="radio-group">
                <input type="radio" id="one-room" name="bedrooms" value="1" />
                <label htmlFor="one-room">1</label>
                <input type="radio" id="two-room" name="bedrooms" value="2" />
                <label htmlFor="two-room">2</label>
                <input type="radio" id="three-room" name="bedrooms" value="3" />
                <label htmlFor="three-room">3</label>
              </div>{" "}
              <br />
              Bathrooms <br />
              <div className="radio-group">
                <input
                  type="radio"
                  id="one-bathroom"
                  name="bathrooms"
                  value="1"
                />
                <label htmlFor="one-bathroom">1</label>
                <input
                  type="radio"
                  id="two-bathroom"
                  name="bathrooms"
                  value="2"
                />
                <label htmlFor="two-bathroom">2</label>
                <input
                  type="radio"
                  id="three-bathroom"
                  name="bathrooms"
                  value="3"
                />
                <label htmlFor="three-bathroom">3</label>
              </div>{" "}
              <br />
              <input type="checkbox" name="terrace" className="single" />{" "}
              Terrace <br />
            </div>

            <div className="secondColumn">
              <input type="checkbox" name="pets" className="single" /> Pets
              allowed <br />
              <input type="checkbox" name="disabled" className="single" />{" "}
              Accessible <br />
              <input type="checkbox" name="renovated" className="single" />{" "}
              Recently renovated <br />
              <input
                type="checkbox"
                name="air_conditioning"
                className="single"
              />{" "}
              Air conditioning <br />
              <div className="nearby">
                Nearby <br />
                <input
                  type="checkbox"
                  name="transport"
                  className="single"
                />{" "}
                Public transport <br />
                <input type="checkbox" name="schools" className="single" />{" "}
                Schools <br />
                <input
                  type="checkbox"
                  name="shops"
                  className="single"
                /> Shops <br />
              </div>
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default TextForm;
