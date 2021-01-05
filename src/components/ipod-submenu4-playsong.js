import React from 'react';
import '../index.css';

import IpodWheelButtonControl from "./ipod-wheel-button-control";

class IpodSubmenu4Playsong extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wheelEvent: '',
            highlightedItem: '',
            currentScreen: 'PlaySong'
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
            this.props.updateMenuItem(ScreenToGo, 3, this.getHighlightedItem(), ScreenStack);
        } else {
            ScreenStack.push(this.readState().currentScreen); // Push the current Screen into it, so that we can use it for GoBack later
            this.props.updateMenuItem(this.getHighlightedItem(), 4, this.getHighlightedItem(), ScreenStack);
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

        const {readState} = this.props;
        const songSelected = readState().MenuItem;

        return (
            <div>
                <div id="screen-box">
                    <div id="header" className="heading">Playing..</div>
                    <div className="sidenav">
                        <div id="GoBack" className="menu-item go-back-margin"><a href="#GoBack">
                            <i className="fas fa-chevron-circle-left go-back"></i>Back to previous menu</a></div>

                        <div>
                            {(songSelected === 'khairiyat') &&
                            (<div>
                                <div className="song-playing">Khairiyat (Happy) - Chhichhore</div>
                                <audio controls autoPlay>
                                    <source src="https://files1.mp3slash.xyz/stream/94b65324b4a070aa416b073ee3c6e2db" type="audio/mp3">
                                    </source>
                                </audio>
                            </div>)}

                            {(songSelected === 'coolieNo1') &&
                            (<div>
                                <div className="song-playing">Teri Bhabhi - Coolie No. 1</div>
                                <audio controls autoPlay>
                                <source src="https://files1.mp3slash.xyz/stream/6e404c63f6d4b9c0a7ca73c077f5bb61" type="audio/mp3">
                                </source>
                            </audio>
                            </div>)}

                            {(songSelected === 'dusBahane') &&
                            (<div>
                                <div className="song-playing">Dus Bahane 2.0 - Baaghi 3</div>
                                <audio controls autoPlay>
                                <source src="https://files1.mp3slash.xyz/stream/d667882b4f0930fcbf65a9c123853f0a" type="audio/mp3">
                                </source>
                            </audio>
                            </div>)}

                            {(songSelected === 'abaadBarbaad') &&
                            (<div>
                                <div className="song-playing">Abaad Barbaad - Ludo</div>
                                <audio controls autoPlay>
                                <source src="https://files1.mp3slash.xyz/stream/56b024737b50e30e977a6fe4ccb41f8e" type="audio/mp3">
                                </source>
                            </audio>
                            </div>)}

                            {(songSelected === 'muquabla') &&
                            (<div>
                                <div className="song-playing">Muquabla - Street Dancer 3</div>
                                <audio controls autoPlay>
                                <source src="https://files1.mp3slash.xyz/stream/455987a38b2562ef299a1b9d0dfdb0ba" type="audio/mp3">
                                </source>
                            </audio>
                            </div>)}

                            {(songSelected === 'ghungroo') &&
                            (<div>
                                <div className="song-playing">Ghungroo - War</div>
                                <audio controls autoPlay>
                                <source src="https://files1.mp3slash.xyz/stream/9cc79a0440e73232e263afb23c535884" type="audio/mp3">
                                </source>
                            </audio>
                            </div>)}



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