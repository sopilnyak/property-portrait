import React, {Component} from 'react';
import './styles.css';

class TextForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adText: 'Заголовок\n' +
                'Заголовок – это самая заметная часть объявления. В идеале он должен включать слова, которые люди используют при поиске. В текстовых объявлениях используются три заголовка. Максимальная длина каждого из них – 30 символов. Заголовки разделяются вертикальной чертой и могут показываться в разных сочетаниях. Это зависит от устройства, с помощью которого потенциальный клиент просматривает рекламу.\n' +
                '\n' +
                'Отображаемый URL\n' +
                'Отображаемый URL – это адрес рекламируемого сайта. Обычно он выделен зеленым цветом. Отображаемый URL содержит домен конечного URL и текст необязательных полей Путь. Этот текст помогает пользователям понять, на какую страницу ведет объявление. Язык текста полей "Путь" может отличаться от языка остального текста отображаемого URL. \n',
            photoGroups: [
                {room: 'Bedroom', photoKeys: ['https://via.placeholder.com/120', 'https://via.placeholder.com/80', 'https://via.placeholder.com/80'], key: 0},
                {room: 'Bath', photoKeys: ['https://via.placeholder.com/120'], key: 1},
                {room: 'Kitchen', photoKeys: ['https://via.placeholder.com/120', 'https://via.placeholder.com/80'], key: 2},
            ],
        };

        this.formChange = this.formChange.bind(this);
    }

    formChange = event => {
        this.setState({adText: event.target.value});
    };

    render() {
        return (
            <div className="textForm">
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
