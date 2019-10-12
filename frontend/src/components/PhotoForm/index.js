import React, {Component} from 'react';

import './styles.css';

const PhotoGroup = ({room, photoKeys}) => {
    return (
        <div>
            <h3>{room}</h3>
            <div className="scrollmenu">
                {photoKeys.map(item => (<span>{item}</span>))}
            </div>
            <hr />
        </div>
    )
};

class PhotoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoGroups: [
                {room: 'Bedroom', photoKeys: ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'bbb', 'ccc'], key: 0},
                {room: 'Bath', photoKeys: ['aaa', 'bbb', 'ccc'], key: 1},
                {room: 'Kitchen', photoKeys: ['aaa', 'bbb', 'ccc'], key: 2},
            ],
        }

    }
    render() {
        return (
            <div className="photoForm">
                {this.state.photoGroups.map((item) => PhotoGroup(item))}
            </div>
        );
    }
}

export default PhotoForm;
