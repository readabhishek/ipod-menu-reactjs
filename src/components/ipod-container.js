import React from 'react';
import IpodMainMenu from "./ipod-main-menu";
import IpodSubMenuMusic from "./ipod-submenu-music";

class IpodContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MenuItem: '',
            MenuLevel: 1,
            HighlightedItem: ''
        }
    }

    updateMenuItem = (MenuItem, MenuLevel, HighlightedItem) => {
        this.setState((prev) => {
                return {
                    /*[key]: value*/      /* [] is used to use the value of key variable, otherwise it'll set it as 'key'  */
                    MenuItem: MenuItem,
                    MenuLevel: MenuLevel,
                    HighlightedItem: HighlightedItem
                }
            }
        );
    }

    readState = () => {
        return this.state;
    }

    render() {
        console.log("State: ", this.state);
        return (
            <div>
                {
                    (this.readState().MenuLevel === 1) && <IpodMainMenu updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }
                {
                    (this.readState().MenuLevel === 2 && this.readState().MenuItem === 'Music') && <IpodSubMenuMusic updateMenuItem={this.updateMenuItem} readState = {this.readState}/>

                }
            </div>
        );
    }

}

export default IpodContainer;