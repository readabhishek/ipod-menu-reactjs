import React from 'react';
import '../index.css';

import IpodWheelButtonControl from "./ipod-wheel-button-control";

class IpodSubMenuMusic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wheelEvent: '',
            highlightedItem: '',
        }
    }

    setWheelEvent = (wheelEvent) => {
        this.setState({wheelEvent: wheelEvent});
        console.log("From Parent: Event Received: ", this.getWheelEvent());

        /* Now set the state in the top (Grand Parent) component. If Go Back Button is Clicked, then we update the State Accordingly so that we go Back  */
        if (this.getWheelEvent() === 'select' && this.getHighlightedItem() === 'GoBack') {
            /* Note: We are passing MenuLevel = 2, because this means change the Menu and Show the SubMenu which is at level 2 */
            this.props.updateMenuItem(this.getHighlightedItem(), 1, this.getHighlightedItem());
        }

    }

    setHighlightedItem = (highlightedItem) => {
        this.setState({highlightedItem: highlightedItem});
        console.log("From Parent: Event Received: ", this.getHighlightedItem());
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
                    <div className="heading">Music</div>
                    <div className="sidenav">
                        <div id="GoBack" className="menu-item"><a href="#about">Go Back</a>
                        </div>
                        <div id="AllSongs" className="menu-item"><a href="#about">All Songs</a></div>
                        <div id="Artists" className="menu-item"><a href="#services">Artists</a></div>
                        <div id="Albums" className="menu-item"><a href="#clients">Albums</a></div>
                        <div id="Videos" className="menu-item"><a href="#clients">Videos</a></div>
                        <div id="PlayLists" className="menu-item"><a href="#clients">PlayLists</a></div>
                        <div id="Search" className="menu-item"><a href="#contact">Search</a></div>
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