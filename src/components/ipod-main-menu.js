import React from 'react';
import '../index.css';
import IpodWheelButtonControl from "./ipod-wheel-button-control";


class IpodMainMenu extends React.Component {
    constructor(props) {
        super(props);

        const script1 = document.createElement("script");
        script1.src = "https://kit.fontawesome.com/7c81f1d981.js";
        script1.async = true;
        script1.crossOrigin = "anonymous";
        document.body.appendChild(script1);

        this.state = {
            wheelEvent: '',
            highlightedItem: '',
        }

    }

    setWheelEvent = (wheelEvent) => {
        this.setState({wheelEvent: wheelEvent});
        console.log("From Parent: Event Received: ", this.getWheelEvent());

        /* Now set the state in the top (Grand Parent) component  */
        if (this.getWheelEvent() === 'select') {
            /* Note: We are passing MenuLevel = 2, because this means change the Menu and Show the SubMenu which is at level 2 */
            this.props.updateMenuItem(this.getHighlightedItem(), 2, this.getHighlightedItem());
        }
    }

    setHighlightedItem = (highlightedItem) => {
        this.setState({highlightedItem: highlightedItem});
        console.log("From Parent: Event Received: ", this.getHighlightedItem());
    }

    getWheelEvent = () => {
        return this.state.wheelEvent;
    }

    getHighlightedItem  = () => {
        return this.state.highlightedItem;
    }

    handleTopMenuClickEvent = (e) => {
        console.log("Menu Item Clicked: ", e.target.parentNode.id);
    }



    /* ********** Component Did Mount *********** */

    componentDidMount() {
        // Do Nothing
    }


    /* ********* Render Function **********  */


    render() {
        const updateState = this.props;
        return (
            <div>
                <div id="screen-box">
                    <div className="heading">iPod.js</div>
                    <div className="sidenav">

                        <div id="Cover" className="menu-item">
                            <a href="#Cover" onClick={(e) => this.handleTopMenuClickEvent(e)}>Cover Flow</a>
                        </div>
                        <div id="Music" className="menu-item">
                            <a href="#Music" onClick={(e) => this.handleTopMenuClickEvent(e)}>Music</a>
                        </div>
                        <div id="Games" className="menu-item">
                            <a href="#Games" onClick={(e) => this.handleTopMenuClickEvent(e)}>Games</a>
                        </div>
                        <div id="Playlists" className="menu-item">
                            <a href="#Games" onClick={(e) => this.handleTopMenuClickEvent(e)}>PlayLists</a>
                        </div>

                        <div id="Settings" className="menu-item">
                            <a href="#Settings" onClick={(e) => this.handleTopMenuClickEvent(e)}>Settings</a>
                        </div>
                    </div>
                </div>

                {
                    <IpodWheelButtonControl setWheelEvent={this.setWheelEvent} setHighlightedItem={this.setHighlightedItem}/>
                }
            </div>
        );
    }
}

export default IpodMainMenu;