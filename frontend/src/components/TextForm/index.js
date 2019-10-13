import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Alert} from 'reactstrap';

import "./styles.css";

const PhotoGroup = ({room, image_urls}) => {
  return (
      <div className="photoGroup">
          <h3>{room}</h3>
          <div className="scrollmenu">
            {image_urls.map(item =>
                (<img className="roomImg" src={item}/>))}
          </div>
          <hr />
      </div>
  )
};

class TextForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warningText: '',
      adText: "Ad text here",
      photoGroups: [],
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
    xhr.open(
      "POST",
      "https://dae442f5.ngrok.io/api/description",
      true /*async*/
    );
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = () => {
      console.log(xhr.response.description);
      this.setState({ adText: xhr.response.description });
      console.log(xhr.response);
      this.setState({ photoGroups: xhr.response.types });
      this.setState({ warningText: xhr.response.tip });
    };
    xhr.send(
      JSON.stringify({
        form: json_data,
        image_keys: ["flat1.jpg", "flat2.jpg"]
      })
    );
  };

  render() {
    return (
        <div>
        <main className="mainPart">
          <p>{this.state.adText}</p>

        <form onSubmit={this.handleSubmit}>
          <div className="infoForm">
            <div className="secondColumn">
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
                <h4>Nearby</h4>
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
              <div className="uploadPhotos">
                <h4>Upload photos</h4>
                <input type='file' />
              </div>
            </div>
          </div>
          {this.state.warningText.length > 0 &&
          <Alert color="danger">
            {this.state.warningText}
          </Alert>
          }
          <input type="submit" value="Submit" />
        </form>
        </main>
          <div className="photoForm">
            {this.state.photoGroups.length > 0 &&
              this.state.photoGroups.map(item => PhotoGroup(item))
            }
          </div>
  </div>
    );
  }
}

export default TextForm;
