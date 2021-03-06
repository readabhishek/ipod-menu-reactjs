import React from 'react';
import '../index.css';

import IpodWheelButtonControl from "./ipod-wheel-button-control";


/* Demo Component to display list of Games. Not much action here */

class IpodSubMenuGames extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wheelEvent: '',
            highlightedItem: '',
            currentScreen: 'Games'
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
            this.props.updateMenuItem(ScreenToGo, 1, this.getHighlightedItem(), ScreenStack);
        } else if (this.getWheelEvent() === 'MENU') {
            this.props.updateMenuItem('', 1, this.getHighlightedItem(), []);
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
                    <div id="header" className="heading">Games</div>
                    <div className="sidenav">
                        <div id="GoBack" className="menu-item go-back-margin"><a href="#GoBack">
                            <i className="fas fa-chevron-circle-left go-back"></i>Go Back</a></div>
                        <div id="snake" className="menu-item"><a href="#about">Snake</a></div>
                        <div id="pc-man" className="menu-item"><a href="#services">PC-Man</a></div>
                        <div id="tic-tac" className="menu-item"><a href="#clients">Tic-Tac-Toe</a></div>
                        <div id="bricks" className="menu-item"><a href="#clients">Bricks</a></div>
                        </div>
                </div>
                {
                    <IpodWheelButtonControl setWheelEvent={this.setWheelEvent} setHighlightedItem={this.setHighlightedItem}/>
                }
            </div>
        )

    }


}

export default IpodSubMenuGames;