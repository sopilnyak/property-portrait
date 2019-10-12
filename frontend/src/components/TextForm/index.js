import React, {Component} from 'react';
import Button from './../Button';

import './styles.css';

class TextForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adText: 'alalalalalalalalalalalal\n\n\naakakakka',
            itemList: ['microwave, fridge, flowers, window'],
        };

        this.formChange = this.formChange.bind(this);
    }

    formChange = event => {
        this.setState({adText: event.target.value});
    };

    render() {
        return (
            <div>
                <form>
                    <div className="infoForm">
                    <div className="secondColumn">
                    <input type="text" id="fname" placeholder="Full name" /> <br />

                    <input type="text" id="location" placeholder="Location" /> <br />
                    <select id="country" name="country" placeholder="Type"> <br />
                        <option value="type">Type</option>
                        <option value="house">House</option>
                        <option value="flat">Flat</option>
                        <option value="duplex">Duplex</option>
                        <option value="penthouse">Penthouse</option>
                    </select> <br />
                    Bedrooms <br/>
                    <div className="radio-group">
                        <input type="radio" id="one-room" name="selectorRoom" />
                        <label htmlFor="one-room">1</label>
                        <input type="radio" id="two-room" name="selectorRoom" />
                        <label htmlFor="two-room">2</label>
                        <input type="radio" id="three-room" name="selectorRoom" />
                        <label htmlFor="three-room">3</label>
                    </div> <br />
                    Bathrooms <br />
                    <div className="radio-group">
                        <input type="radio" id="one-bathroom" name="selectorBathroom" />
                        <label htmlFor="one-bathroom">1</label>
                        <input type="radio" id="two-bathroom" name="selectorBathroom" />
                        <label htmlFor="two-bathroom">2</label>
                        <input type="radio" id="three-bathroom" name="selectorBathroom" />
                        <label htmlFor="three-bathroom">3</label>
                    </div> <br />
                    <input type="checkbox" name="terrace" className="single"/> Terrace <br />
                    </div>

                    <div className="secondColumn">
                        <input type="checkbox" name="pets" className="single"/> Pets allowed <br />
                        <input type="checkbox" name="accessible" className="single"/> Accessible <br />

                        <input type="checkbox" name="renovated" className="single"/> Recently renovated <br />
                        <input type="checkbox" name="conditioning" className="single"/> Air conditioning <br />

                        <div className="nearby">Nearby <br />
                            <input type="checkbox" name="transport" className="single"/> Public transport <br />
                            <input type="checkbox" name="schools" className="single"/> Schools <br />
                            <input type="checkbox" name="shops" className="single"/> Shops <br />
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
