import React from 'react';
import IpodMainMenu from "./ipod-main-menu";

class IpodContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topMenuItem: '',
            subMenuItemLevel1: '',
            subMenuItemLevel2: ''
        }
    }

    updateMenuItem = (key, value) => {
        this.setState((prev) => {
                return {
                    [key]: value      /* [] is used to use the value of key variable, otherwise it'll set it as 'key'  */
                }
            }
        );
    }

    render() {
        console.log("State: ", this.state);
        return (
            <IpodMainMenu updateMenuItem={this.updateMenuItem}/>
        );
    }

}

export default IpodContainer;