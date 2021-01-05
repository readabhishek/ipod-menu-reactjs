import React from 'react';
import '../index.css';

class IpodWheelButtonControl extends React.Component {
    constructor(props) {
        super(props);

    }


    /*  Adding event listeners to all the buttons in the Wheel/Control. It sends the events back to the calling component   */
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

            /*  This sets the data based on rotation gesture on the wheel  */
            setOutput([
                ['Gesture', 'Rotate'],
                ['angle', Math.floor(e.detail.angle) + "°"],
                ['distanceFromOrigin', Math.floor(e.detail.distanceFromOrigin) + "°"],
                ['distanceFromLast', Math.floor(e.detail.distanceFromLast) + "°"]
            ], setParentState);

        });

        function setOutput(data, setParentState) {

            /* This function is used to highlight menu items from top to bottom or vice-versa based on rotation gesture on the wheel */
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
                menuItems[activeItemIndex].className += " active";   /* Item Active = Highlighted  */
                let menuItem = menuItems[activeItemIndex].id;
                /*updateMenuItem(menuItem, 1, 'Main');*/
                setParentState(menuItem);
            }



            function selectTopMenuItems(isTopToBottom) {

                /* First make all the Menu Items - without active class. Note active class make the item focused */
                /* This is all about making the individual menu item highlighted  */
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
                    i = Array.prototype.indexOf.call(menuItems, activeItem); /* This gives the index of active items. Item Active = Highlighted */
                }
                /* isTopToBottom = True. This means we are traversing from Top to Bottom in Menu and the
                Wheel rotation is Clockwise in the control  */
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

            /* if angle traversed by rotation gesture is more than 15 degree, then raise an event to highlight next menu item.
            *  Move top to bottom is rotation gesture is Clockwise   */
            if (diffAngle > Number(15)) {
                //console.log("ClockWise: ", "dis4mOrigin: ", dis4mOrigin, "initialDistance: ", initialDistance, "Diff", diffAngle);
                initialDistance = dis4mOrigin;
                selectTopMenuItems(true);
            }

            /* if angle traversed by rotation gesture is more than 15 degree, then raise an event to highlight next menu item.
            *  Move Bottom to Top is rotation gesture is Anti-Clockwise   */
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
                <div id="winner" className="wheel-inner top-wrapper wheel-pointer">
                    <div id="rotate-container wheel-pointer">
                        <div id="rotatable"></div>
                    </div>
                    <div id="interaction"></div>
                    <div id="menu" className="wheel-menu wheel-pointer">
                        <span>MENU</span>
                    </div>
                    <div id="fd" className="wheel-fastForward wheel-pointer">
                        <i className="fas fa-fast-forward" id="forward"></i>
                    </div>
                    <div id="bd" className="wheel-fastBackward wheel-pointer">
                        <i className="fas fa-fast-backward" id="backward"></i>
                    </div>
                    <div id="pl" className="wheel-play wheel-pointer">
                        <i className="fas fa-play" id="play"></i>
                    </div>
                    <div id="ps" className="wheel-pause wheel-pointer">
                        <i className="fas fa-pause" id="pause"></i>
                    </div>
                    <div id="select" className="wheel-inner-circle wheel-pointer">
                    </div>

                </div>
            </div>
        )

    }


}

export default IpodWheelButtonControl;