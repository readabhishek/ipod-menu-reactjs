import React from 'react';
import IpodMainMenu from "./ipod-main-menu";
import IpodSubMenuMusic from "./ipod-submenu-music";
import IpodSubMenuGames from "./ipod-submenu-games";
import IpodSubmenuSettings from "./ipod-submenu-settings";
import IpodSubmenuPlaylists from "./ipod-submenu-playlists";
import IpodSubmenuCoverflow from "./ipod-submenu-coverflow";
import IpodSubmenu3Songs from "./ipod-submenu3-songs";
import IpodSubmenu4Playsong from "./ipod-submenu4-playsong";

/* Top Most Component which maintains the Top Most State. Also being referred as Grand Parent in the comments   */

class IpodContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MenuItem: '',          /* This stores the current Menu Item being selected.   */
            MenuLevel: 1,          /* Used to locate which Menu/Submenu level  */
            HighlightedItem: '',   /* This stores the Highlighted Item in screen. Note this is different than selected Item */
            ScreenStack: []        /* This stores the previous screens visited, to facilitate Go Back action */
        }
    }

    readState = () => {           /* Used to return State - In case we need to read the State properties */
        return this.state;
    }

    /* This function updates the State. This is passed to child components in-order to facilitate State changes */
    updateMenuItem = (MenuItem, MenuLevel, HighlightedItem, ScreenStack) => {
           this.setState((prev) => {
                return {
                    /*[key]: value*/      /* [] is used to use the value of key variable, otherwise it'll set it as 'key'  */
                    MenuItem: MenuItem,
                    MenuLevel: MenuLevel,
                    HighlightedItem: HighlightedItem,
                    ScreenStack: ScreenStack
                }
            }
        );
    }



    render() {
        console.log("State: ", this.state);
        /* Every Screen/UI/Child-Component has a Level and Screen Name */
        return (
            <div>
                {
                    (this.readState().MenuLevel === 1) && <IpodMainMenu updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }

                {
                    (this.readState().MenuLevel === 2 && this.readState().MenuItem === 'Music') && <IpodSubMenuMusic updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }

                {
                    (this.readState().MenuLevel === 2 && this.readState().MenuItem === 'Games') && <IpodSubMenuGames updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }

                {
                    (this.readState().MenuLevel === 2 && this.readState().MenuItem === 'Settings') && <IpodSubmenuSettings updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }

                {
                    (this.readState().MenuLevel === 2 && this.readState().MenuItem === 'Playlists') && <IpodSubmenuPlaylists updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }
                {
                    (this.readState().MenuLevel === 2 && this.readState().MenuItem === 'Cover') && <IpodSubmenuCoverflow updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }

                {
                    (this.readState().MenuLevel === 3) && <IpodSubmenu3Songs updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }

                {
                    (this.readState().MenuLevel === 4) && <IpodSubmenu4Playsong updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }

            </div>
        );
    }

}

export default IpodContainer;