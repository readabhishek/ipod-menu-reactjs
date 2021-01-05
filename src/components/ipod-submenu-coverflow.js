import React from 'react';
import '../index.css';

import IpodWheelButtonControl from "./ipod-wheel-button-control";
import ColdPlay from "../images/cold-play.jpg";
import Bruno from "../images/bruno.jpg";
import Charlie from "../images/charlie.jpg";
import EdSheeran from "../images/Ed-Sheeran.jpg";
import Zayn from "../images/zayn.jpg";


/* Just a demo component to show different Albums on screen. On selecting the Albums, a default song is played (to keep things simple)  */
class IpodSubmenuCoverflow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wheelEvent: '',
            highlightedItem: '',
            currentScreen: 'Cover'
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
            /* Go back to Main Menu */
            this.props.updateMenuItem('', 1, this.getHighlightedItem(), []);
        } else {
            ScreenStack.push(this.readState().currentScreen); // Push the current Screen into it, so that we can use it for GoBack later
            /* Just playing a song by default. Can make it better by playing exact song/video, but since this is just demo, making it simple */
            if (this.getHighlightedItem() !== '') {
                this.props.updateMenuItem('abaadBarbaad', 4, this.getHighlightedItem(), ScreenStack);
            }
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
                    <div id="header" className="heading title-floating">Cover Flow</div>
                    <div className="sidenav">
                        <div id="GoBack" className="menu-item go-back-margin"><a href="#GoBack">
                            <i className="fas fa-chevron-circle-left go-back"></i>Go Back</a></div>
                        <div id="coldplay" className="menu-item image-div"><img  className="cover-flow" src={ColdPlay}/></div>
                        <div id="bruno" className="menu-item image-div"><img className="cover-flow" src={Bruno}/></div>
                        <div id="charlie" className="menu-item image-div"><img className="cover-flow" src={Charlie}/></div>
                        <div id="edsheeran" className="menu-item image-div"><img className="cover-flow" src={EdSheeran}/></div>
                        <div id="zayn" className="menu-item image-div"><img className="cover-flow" src={Zayn}/></div>
                        <div id="colsplay1" className="menu-item image-div"><img className="cover-flow" src={ColdPlay}/></div>
                    </div>
                </div>
                {
                    <IpodWheelButtonControl setWheelEvent={this.setWheelEvent} setHighlightedItem={this.setHighlightedItem}/>
                }
            </div>
        )

    }


}

export default IpodSubmenuCoverflow;