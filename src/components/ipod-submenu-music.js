import React from 'react';
import '../index.css';

import IpodWheelButtonControl from "./ipod-wheel-button-control";

class IpodSubMenuMusic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wheelEvent: '',
            highlightedItem: '',
            currentScreen: 'Music'
        }
    }

    readState = () => {
        return this.state;
    }

    setWheelEvent = (wheelEvent) => {
        this.setState({wheelEvent: wheelEvent});
        //console.log("From Parent: Event Received: ", this.getWheelEvent());
        let ScreenStack = this.props.readState().ScreenStack; // Get the ScreenStack of Grand Parent (State).

        /* Now set the state in the top (Grand Parent) component. If Go Back Button is Clicked, then we update the State Accordingly so that we go Back  */
        if (this.getWheelEvent() === 'select' && this.getHighlightedItem() === 'GoBack') {

            /* GoBack Scenario */
            let ScreenToGo = ScreenStack.pop();

            /* Note: We are passing MenuLevel = 2, because this means change the Menu and Show the SubMenu which is at level 2 */
            this.props.updateMenuItem(ScreenToGo, 1, this.getHighlightedItem(), ScreenStack);
        } else {
            ScreenStack.push(this.readState().currentScreen); // Push the current Screen into it, so that we can use it for GoBack later
            this.props.updateMenuItem(this.getHighlightedItem(), 3, this.getHighlightedItem(), ScreenStack);
        }

    }

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
        return (
            <div>
                <div id="screen-box">
                    <div id="header" className="heading title-floating">Music</div>
                    <div className="sidenav">
                        <div id="GoBack" className="menu-item go-back-margin"><a href="#GoBack">
                            <i className="fas fa-chevron-circle-left go-back"></i>Go Back</a></div>
                        <div id="AllSongs" className="menu-item"><a href="#AllSongs">All Songs</a></div>
                        <div id="Artists" className="menu-item"><a href="#Artists">Artists</a></div>
                        <div id="Albums" className="menu-item"><a href="#Albums">Albums</a></div>
                        <div id="Videos" className="menu-item"><a href="#Videos">Videos</a></div>
                        <div id="PlayLists" className="menu-item"><a href="#PlayLists">PlayLists</a></div>
                        <div id="Search" className="menu-item"><a href="#Search">Search</a></div>
                    </div>
                </div>
                {
                    <IpodWheelButtonControl setWheelEvent={this.setWheelEvent} setHighlightedItem={this.setHighlightedItem}/>
                }
            </div>
        )

    }


}

export default IpodSubMenuMusic;