import React, {Component, useState} from "react";
import {Alert} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

export var adText;
export var photoGroups;

const PhotoGroup = ({ room, image_urls }) => {
  return (
    <div className="photoGroup">
      <h3>{room}</h3>
      <div className="scrollmenu">
        {image_urls.map(item => (
          <img className="roomImg" alt="Uploaded picture" src={item} />
        ))}
      </div>
      <hr />
    </div>
  );
};

const AlertWarning = ({text}) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
      <Alert color="warning" isOpen={visible} toggle={onDismiss}>
        {text}
      </Alert>
  );
};

class TextForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warningText: "",
      adText: "Here will be your ad text...",
      photoGroups: [],
      imageKeys: [],
      form: {},
      sessionId: 0,
        lang: "en",
        isLoading: false
    };

    adText=this.state.adText;
    photoGroups=this.state.photoGroups;

    this.formChange = this.formChange.bind(this);
  }

  formChange = event => {
    this.setState({ adText: event.target.value });
  };

  updateDescription() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(
      "POST",
      "https://dae442f5.ngrok.io/api/description",
      true /*async*/
    );
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = () => {
      this.setState({
        adText: xhr.response.description,
        photoGroups: xhr.response.types,
        warningText: xhr.response.tip,
        sessionId: xhr.response.session_id,
          lang: "en",
          isLoading: false
      });
      adText=this.state.adText;
      photoGroups=this.state.photoGroups;
    };
    this.setState({isLoading: true},
    xhr.send(
      JSON.stringify({
        form: this.state.form,
        image_keys: this.state.imageKeys,
        session_id: this.state.sessionId,
          lang: this.state.lang
      })
    ));
  }

  handleSubmit = event => {
    event.preventDefault();
    this.uploadFile(event);
    const form = new FormData(event.target);
    let json_data = {};
    let lang = {};
    form.forEach(function(value, key) {
      if (key !== "file") {
        json_data[key] = value;
      }
      if (key === "lang") {
        lang = value;
      }
    });
    this.setState({ form: json_data, lang }, () => this.updateDescription());
  };

  uploadFile = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.entries);
    let this_ = this;
    fetch("https://dae442f5.ngrok.io/api/upload", {
      method: "POST",
      body: formData
    })
      .then(function(response) {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .then(function(response) {
        let keys = this_.state.imageKeys;
        keys.push(...response["image_keys"]);
        this_.setState({ imageKeys: keys }, () => this_.updateDescription());
      });
  };

  pForm = adPart => (<p className={"adP"}>{ adPart }</p>);

  render() {
    let parts = this.state.adText.split('\n');

    return (
      <div className="bodyPart">
        <main className="mainPart">
          <div className="leftPart">
            <div className="descPart">
                {this.state.isLoading ? <img src={process.env.PUBLIC_URL + "/loading.gif"} alt={"loading..."} /> : parts.map(x => this.pForm(x))}
            </div>
            <div className="photoForm">
              {this.state.photoGroups.map(item => PhotoGroup(item))}
            </div>
            <form onSubmit={this.uploadFile} className="uploadForm">
              <input type="file" name="file" multiple />
              <input type="submit" value="Upload photos" />
            </form>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="infoForm">
              <div className="formColumn">
                <input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="John Biene"
                  required
                />
                <br />
                <input
                  name="phone"
                  type="text"
                  id="phone"
                  placeholder="+34 123 456 7890"
                  required
                />
                <br />
                <input
                  name="location"
                  type="text"
                  id="location"
                  placeholder="at HackUPC, Barcelona..."
                  required
                />
                <br />
                <input
                  name="size"
                  type="text"
                  id="size"
                  placeholder="100 m2"
                  required
                />
                <br />
                <input
                  name="price"
                  type="text"
                  id="price"
                  placeholder="1000 €/month"
                />
                <br />
                <select
                  id="type"
                  name="type"
                  placeholder="Type"
                  defaultValue="flat"
                >
                  <option value="flat">Flat</option>
                  <option value="house">House</option>
                  <option value="duplex">Duplex</option>
                  <option value="penthouse">Penthouse</option>
                </select>
                <br />
                Bedrooms <br />
                <div className="radio-group">
                  <input
                    type="radio"
                    id="one-room"
                    name="bedrooms"
                    value="1"
                    defaultChecked
                  />
                  <label htmlFor="one-room">1</label>
                  <input type="radio" id="two-room" name="bedrooms" value="2" />
                  <label htmlFor="two-room">2</label>
                  <input
                    type="radio"
                    id="three-room"
                    name="bedrooms"
                    value="3"
                  />
                  <label htmlFor="three-room">3</label>
                </div>
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
                </div>
                <br />
                <br />
                <div className="radio-group">
                  <input
                    type="radio"
                    id="eng"
                    name="lang"
                    value="en"
                    defaultChecked
                  />
                  <label htmlFor="eng">in English</label>
                  <input
                    type="radio"
                    id="ru"
                    name="lang"
                    value="ru"
                  />
                  <label htmlFor="ru">in Russian</label>
                </div>
                <br />
              </div>

              <div className="formColumn">
                <input type="checkbox" name="terrace" className="single" />
                Terrace <br />
                <input type="checkbox" name="pets" className="single" />
                Pets allowed <br />
                <input type="checkbox" name="disabled" className="single" />
                Accessible <br />
                <input type="checkbox" name="renovated" className="single" />
                Recently renovated <br />
                <input
                  type="checkbox"
                  name="air_conditioning"
                  className="single"
                />
                Air conditioning <br />
                <div className="nearby">
                  Nearby <br />
                  <input type="checkbox" name="transport" className="single" />
                  Public transport <br />
                  <input type="checkbox" name="schools" className="single" />
                  Schools <br />
                  <input type="checkbox" name="shops" className="single" />
                  Shops <br />
                </div>
              </div>
            </div>
            {this.state.warningText.length > 0 && (
              <AlertWarning text={this.state.warningText}/>
            )}
            <input type="submit" value="Generate!" />
          </form>
        </main>
      </div>
    );
  }
}

export default TextForm;
