import React from 'react';
import '../index.css';

import IpodWheelButtonControl from "./ipod-wheel-button-control";
import {Songs} from "../data/Songs";

/* Displays the list of Songs  */

class IpodSubmenu3Songs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wheelEvent: '',                   /* Wheel-Button component sends events and this property is used to store it */
            highlightedItem: '',
            currentScreen: 'SongsSubMenu'     /* Screen Name */
        }
    }

    readState = () => {
        return this.state;
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
            /* Note: We are passing MenuLevel = 2, because this means change the Menu and Show the SubMenu which is at level 2 */
            this.props.updateMenuItem(ScreenToGo, 2, this.getHighlightedItem(), ScreenStack);
        } else if (this.getWheelEvent() === 'MENU') {
            /* Go back to Main Menu  */
            this.props.updateMenuItem('', 1, this.getHighlightedItem(), []);
        } else {
            /* Go to Songs Player Screen */
            ScreenStack.push(this.readState().currentScreen); // Push the current Screen into it, so that we can use it for GoBack later
            if (this.getHighlightedItem() !== '') {
                this.props.updateMenuItem(this.getHighlightedItem(), 4, this.getHighlightedItem(), ScreenStack);
            }
        }

    }

    /* This just updates current component State with highlighted item  */
    setHighlightedItem = (highlightedItem) => {
        this.setState({highlightedItem: highlightedItem});
        document.getElementById(this.getHighlightedItem()).scrollIntoView(true);
        if (this.getHighlightedItem() === 'GoBack') {   /* Just to bring scroll back on top  */
            window.location.href = "#header";
        }
    }

    getWheelEvent = () => {
        return this.state.wheelEvent;
    }

    getHighlightedItem = () => {
        return this.state.highlightedItem;
    }

    /* A static list of songs are kept in data folder. We are loading the songs from there   */
    /* Note: IpodWheelButtonControl component is called at the end, that's the Wheel Control which passes events back to current Component  */
    render() {
        return (
            <div>
                <div id="screen-box">
                    <div id="header" className="heading">Select to Play Song</div>
                    <div className="sidenav">
                        <div id="GoBack" className="menu-item go-back-margin"><a href="#GoBack">
                            <i className="fas fa-chevron-circle-left go-back"></i>Go Back</a></div>

                        {  Songs.map(song => {
                                return (<div id={song.id} className="menu-item"><a href="#song.id">{song.name}</a></div>);
                            })
                        }
                    </div>
                </div>
                {
                    <IpodWheelButtonControl setWheelEvent={this.setWheelEvent} setHighlightedItem={this.setHighlightedItem}/>
                }
            </div>
        )

    }


}

export default IpodSubmenu3Songs;