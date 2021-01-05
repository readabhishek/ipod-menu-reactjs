import React from 'react';
import '../index.css';

class IpodWheelButtonControl extends React.Component {
    constructor(props) {
        super(props);

    }


    addEventsToWheelButtons = () => {
        document.getElementById("menu").addEventListener("click", ev => {
            //console.log('Clicked: ', ev.target.innerText);
            this.props.setWheelEvent(ev.target.innerText);    /* Sending events generated from wheel control to parent component */
        });
        document.getElementById("fd").addEventListener("click", ev => {
            //console.log('Clicked: ', ev.target.id);
            this.props.setWheelEvent(ev.target.id);
        });
        document.getElementById("bd").addEventListener("click", ev => {
            //console.log('Clicked: ', ev.target.id);
            this.props.setWheelEvent(ev.target.id);
        });
        document.getElementById("pl").addEventListener("click", ev => {
            //console.log('Clicked: ', ev.target.id);
            this.props.setWheelEvent(ev.target.id);
        });
        document.getElementById("ps").addEventListener("click", ev => {
            //console.log('Clicked: ', ev.target.id);
            this.props.setWheelEvent(ev.target.id);
        });
        document.getElementById("select").addEventListener("click", ev => {
            //console.log('Clicked: ', ev.target.id);
            this.props.setWheelEvent(ev.target.id);

        });
    }

    /* This function sets the Parent's state if a Menu Item is selected via select button on wheel  */
    setParentState (highlightedMenuItem) {
        //console.log("Highlighted Menu Item: ", highlightedMenuItem);
        this.props.setHighlightedItem(highlightedMenuItem);
    }


    /* ********** Component Did Mount *********** */

    componentDidMount() {

        this.addEventsToWheelButtons();  /* Attach events to Wheel Buttons  */


        const setParentState = this.setParentState.bind(this);

        let currentAngle = 15;
        let dis4mOrigin = 0;
        let initialDistance = 0;
        //Using a layer on top of the entire page for "fat-finger" detection on mobile devices.
        document.getElementById('rotatable').style.transform = 'rotate(15deg)';

        let target = document.getElementById('winner');
        let region = new window.ZingTouch.Region(target);

        region.bind(target, 'rotate', function (e) {
            let rotatable = document.getElementById('rotatable');
            currentAngle += e.detail.distanceFromLast;
            rotatable.style.transform = 'rotate(' + currentAngle + 'deg)';

            setOutput([
                ['Gesture', 'Rotate'],
                ['angle', Math.floor(e.detail.angle) + "°"],
                ['distanceFromOrigin', Math.floor(e.detail.distanceFromOrigin) + "°"],
                ['distanceFromLast', Math.floor(e.detail.distanceFromLast) + "°"]
            ], setParentState);

        });

        function setOutput(data, setParentState) {
            function moveMenuTopToBottom(menuItems, activeItemIndex, topToBottom) {

                if (topToBottom === true) {
                    if (activeItemIndex < menuItems.length - 1) {
                        activeItemIndex++;
                    }
                } else {
                    if (activeItemIndex === -1) {
                        activeItemIndex = menuItems.length;
                    }
                    if (activeItemIndex > 0) {
                        activeItemIndex--;
                    }
                }
                /*console.log("after change e.target: ", activeItemIndex);*/
                menuItems[activeItemIndex].className += " active";
                let menuItem = menuItems[activeItemIndex].id;
                /*updateMenuItem(menuItem, 1, 'Main');*/
                setParentState(menuItem);
            }



            function selectTopMenuItems(isTopToBottom) {

                /* First make all the Menu Items - without active class. Note active class make the item focused */
                let menuItems = document.getElementsByClassName("menu-item");
                let activeItem = '';
                for (let i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].className.includes("active")) {
                        activeItem = menuItems[i];
                        menuItems[i].className = menuItems[i].className.replace("active", '');
                        break;
                    }
                }
                /*console.log("activeItem: ", activeItem);*/

                let i = -1;
                if (activeItem !== '') {
                    i = Array.prototype.indexOf.call(menuItems, activeItem); /* This gives the index of active items. */
                }

                moveMenuTopToBottom(menuItems, i, isTopToBottom);
            }




            let angle = '';
            for (let i = 0; i < data.length; i++) {
                angle = data[1][1];
                dis4mOrigin = data[2][1];
            }
            /*let output = document.getElementById('output');*/

            dis4mOrigin = dis4mOrigin.substring(0, dis4mOrigin.length - 1);
            let diffAngle = Number(dis4mOrigin - initialDistance);

            if (diffAngle > Number(15)) {
                //console.log("ClockWise: ", "dis4mOrigin: ", dis4mOrigin, "initialDistance: ", initialDistance, "Diff", diffAngle);
                initialDistance = dis4mOrigin;
                selectTopMenuItems(true);
            }

            if (diffAngle < Number(-15)) {
                //console.log("Anti-ClockWise: ", "dis4mOrigin: ", dis4mOrigin, "initialDistance: ", initialDistance, "Diff", diffAngle);
                initialDistance = dis4mOrigin;
                selectTopMenuItems(false);
            }

        }


    }

    render() {
        return (
            <div className="wheel-container">
                <div id="winner" className="wheel-inner top-wrapper">
                    <div id="rotate-container">
                        <div id="rotatable"></div>
                    </div>
                    <div id="interaction"></div>
                    <div id="menu" className="wheel-menu">
                        <span>MENU</span>
                    </div>
                    <div id="fd" className="wheel-fastForward">
                        <i className="fas fa-fast-forward" id="forward"></i>
                    </div>
                    <div id="bd" className="wheel-fastBackward">
                        <i className="fas fa-fast-backward" id="backward"></i>
                    </div>
                    <div id="pl" className="wheel-play">
                        <i className="fas fa-play" id="play"></i>
                    </div>
                    <div id="ps" className="wheel-pause">
                        <i className="fas fa-pause" id="pause"></i>
                    </div>
                    <div id="select" className="wheel-inner-circle">
                    </div>

                </div>
            </div>
        )

    }


}

export default IpodWheelButtonControl;