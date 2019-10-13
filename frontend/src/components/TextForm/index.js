import React, { Component } from "react";
import "./styles.css";

const PhotoGroup = ({room, photoKeys}) => {
  return (
      <div className="photoGroup">
        <h3>{room}</h3>
        <div className="scrollmenu">
          {photoKeys.map(item =>
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
      adText: "Ad text here",
      photoGroups: []
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
      this.setState({ adText: xhr.response.description });
      console.log(xhr.response.types);
      this.setState({ photoGroups: xhr.response.types });
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
        <div className="bodyPart">
        <main className="mainPart">
          <p>{this.state.adText}</p>

        <form onSubmit={this.handleSubmit}>
          <div className="infoForm">
            <div className="formColumn">
              <input
                name="name"
                type="text"
                id="name"
                placeholder="John Biene"
              />{" "}
              <br />
              <input
                name="phone"
                type="text"
                id="phone"
                placeholder="+34 123 456 7890"
              />{" "}
              <br />
              <input
                name="location"
                type="text"
                id="location"
                placeholder="at HackUPC, Barcelona..."
              />{" "}
              <br />
              <input
                name="size"
                type="text"
                id="size"
                placeholder="100 m2"
              />{" "}
              <br />
              <input
                name="price"
                type="text"
                id="price"
                placeholder="1000 €/month"
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
                <input type="radio" id="one-room" name="bedrooms" value="1" defaultChecked />
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
                  defaultChecked
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
            </div>

            <div className="formColumn">
              <input type="checkbox" name="terrace" className="single" />{" "}
              Terrace <br />
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
          <input type="submit" value="Generate!" />
        </form>
        </main>
          <div className="photoForm">
            {this.state.photoGroups.map((item) => PhotoGroup(item))}
          </div>
  </div>
    );
  }
}

export default TextForm;
