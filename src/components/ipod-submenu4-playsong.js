import React from 'react';
import '../index.css';

import IpodWheelButtonControl from "./ipod-wheel-button-control";
import {Songs} from "../data/Songs";


/* This Component is used to Play the Song */
class IpodSubmenu4Playsong extends React.Component {
    constructor(props) {
        super(props);
        this.selectedSongObj = {};
        this.state = {
            wheelEvent: '',                 /* Wheel-Button component sends events and this property is used to store it */
            highlightedItem: '',
            currentScreen: 'PlaySong',
        }
    }

    readState = () => {
        return this.state;
    }

    /* We are using this function because the current component re-renders after every Wheel event.
       Backward and Forward button changes the song but sometimes the previous song keeps playing. This fixes that issue.
    */
    componentDidUpdate(prevProps, prevState, snapshot) {
        /* Called if we update state while pressing forward and backward button */
        const audio = document.getElementsByClassName('player')[0];
        audio.src = this.selectedSongObj.link;
        //audio.pause();
        //audio.load();
        //audio.play();
    }

    /* One of the most important function. This updates States based on Wheel events. Based on updated States, Screen may change */
    setWheelEvent = (wheelEvent) => {
        this.setState({wheelEvent: wheelEvent});
        //console.log("From Parent: Event Received: ", this.getWheelEvent());
        let ScreenStack = this.props.readState().ScreenStack; // Get the ScreenStack of Grand Parent (State).

        /* Now set the state in the top (Grand Parent) component. If Go Back Button is Clicked, then we update the State Accordingly so that we go Back  */
        if (this.getWheelEvent() === 'select' && this.getHighlightedItem() === 'GoBack') {
            /* GoBack Scenario */
            let ScreenToGo = ScreenStack.pop();

            if (ScreenToGo === 'Cover') {   /* By default Cover screen will also play same song. This ensures we go back appropriately */
                this.props.updateMenuItem(ScreenToGo, 2, this.getHighlightedItem(), ScreenStack);
            } else {
                /* Go back to previous Menu */
                this.props.updateMenuItem(ScreenToGo, 3, this.getHighlightedItem(), ScreenStack);
            }
        } else if (this.getWheelEvent() === 'MENU') {
            /* Go back to Main Menu */
            this.props.updateMenuItem('', 1, this.getHighlightedItem(), []);
        } else if (this.getWheelEvent() === 'play') {
            let song = document.getElementsByClassName('player')[0];
            song.play();
        } else if (this.getWheelEvent() === 'pause') {
            let song = document.getElementsByClassName('player')[0];
            song.pause();
        } else if (this.getWheelEvent() === 'forward') {
            /* Next Song being Played */
            let songList = Songs.map(function (el) { return el.id; });
            let songIndex = songList.indexOf(this.props.readState().MenuItem);
            if (songIndex < songList.length-1) {
                let nextSong = songList[++songIndex];
                this.props.updateMenuItem(nextSong, 4, nextSong, ScreenStack);
            }
        } else if (this.getWheelEvent() === 'backward') {
            /* Previous Song being Played  */
            let songList = Songs.map(function (el) { return el.id; });
            let songIndex = songList.indexOf(this.props.readState().MenuItem);
            if (songIndex > 0) {
                let nextSong = songList[--songIndex];
                this.props.updateMenuItem(nextSong, 4, nextSong, ScreenStack);
            }
        } else {
            console.log("Default Action");
            this.props.updateMenuItem(this.props.readState().MenuItem, 4, this.props.readState().MenuItem, ScreenStack);
        }

    }

    /* This just updates current component State with highlighted item  */
    setHighlightedItem = (highlightedItem) => {
        this.setState({highlightedItem: highlightedItem});
        document.getElementById(this.getHighlightedItem()).scrollIntoView(true);
        if (this.getHighlightedItem() === 'GoBack') {   /* Just to bring scroll back on top  */
            window.location.href = "#header";
        }
        //console.log("From Parent: Event Received: ", this.getHighlightedItem());
    }

    getWheelEvent = () => {
        return this.state.wheelEvent;
    }

    getHighlightedItem = () => {
        return this.state.highlightedItem;
    }


    render() {
        /* Get the Song from the selected menu item and get the details from the Song List (data)  */
        const {readState} = this.props;
        const songSelected = readState().MenuItem;
        let songList = Songs.map(function (el) { return el.id; });
        let songIndex = songList.indexOf(songSelected);
        this.selectedSongObj = Songs[songIndex];
        console.log("Song Playing: ", this.selectedSongObj);

        return (
            <div>
                <div id="screen-box">
                    <div id="header" className="heading">Playing..</div>
                    <div className="sidenav">
                        <div id="GoBack" className="menu-item go-back-margin"><a href="#GoBack">
                            <i className="fas fa-chevron-circle-left go-back"></i>Back to previous menu</a></div>

                        <div>
                            {
                                <div>
                                    <div className="song-playing">{this.selectedSongObj.name}</div>
                                    <audio controls autoPlay className="player">
                                        <source src={this.selectedSongObj.link} type="audio/mp3">
                                        </source>
                                    </audio>
                                </div>
                            }

                        </div>
                    </div>
                </div>
                {
                    <IpodWheelButtonControl setWheelEvent={this.setWheelEvent} setHighlightedItem={this.setHighlightedItem}/>
                }
            </div>
        )

    }


}

export default IpodSubmenu4Playsong;