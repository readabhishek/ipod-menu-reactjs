import React from 'react';
import '../index.css';


class IpodMainMenu extends React.Component {
    constructor(props) {
        super(props);

        const script1 = document.createElement("script");
        script1.src = "https://kit.fontawesome.com/7c81f1d981.js";
        script1.async = true;
        script1.crossOrigin = "anonymous";
        document.body.appendChild(script1);
    }


    addEventsToElements = () => {
        document.getElementById("menu").addEventListener("click", ev => {
            console.log('Clicked: ', ev.target.innerText);
        });
        document.getElementById("fd").addEventListener("click", ev => {
            console.log('Clicked: ', ev.target.id);
        });
        document.getElementById("bd").addEventListener("click", ev => {
            console.log('Clicked: ', ev.target.id);
        });
        document.getElementById("pl").addEventListener("click", ev => {
            console.log('Clicked: ', ev.target.id);
        });
        document.getElementById("ps").addEventListener("click", ev => {
            console.log('Clicked: ', ev.target.id);
        });
        document.getElementById("select").addEventListener("click", ev => {
            console.log('Clicked: ', ev.target.id);
        });
    }


    


    componentDidMount() {








        /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content.
        This allows the user to have multiple dropdowns without any conflict */
        console.log("IpodMainMenu Component Did Mount");
        let dropdown = document.getElementsByClassName("dropdown-btn");
        let i;



        for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function () {
                this.classList.toggle("active");
                let dropdownContent = document.getElementById("drop-down-submenu1");
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
            });
        }

        let currentAngle = 15;
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
            ]);

        });

        function setOutput(data) {


            function moveMenuTopToBottom (menuItems, activeItemIndex, topToBottom) {


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

            }

            function handleTopMenuClickEvent (isTopToBottom)  {
                /*const {updateMenuItem} = this.props;*/
                /*updateMenuItem('topMenuItem', e.target.innerHTML);*/

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





            let outputStr = "> ";

            let dis4mOrigin = 0;
            let initialDistance = 0;
            let angle = '';
            for (let i = 0; i < data.length; i++) {
                outputStr += data[i][0] + ": " + data[i][1] + ((i === data.length - 1) ? '' : ' , ');
                angle = data[1][1];
                dis4mOrigin = data[2][1];
            }
            /*let output = document.getElementById('output');*/
            /*console.log(angle.substring(0,angle.length-1));*/
            /*console.log(dis4mOrigin.substring(0, dis4mOrigin.length - 1));*/


            dis4mOrigin = dis4mOrigin.substring(0, dis4mOrigin.length - 1);



            if ((dis4mOrigin - initialDistance) > 15) {
                handleTopMenuClickEvent(true);
                console.log("ClockWise: ","dis4mOrigin: ", dis4mOrigin, "initialDistance: ", initialDistance, "Diff", dis4mOrigin - initialDistance);

                initialDistance = dis4mOrigin;
            }

            if ((dis4mOrigin - initialDistance) < 15) {
                handleTopMenuClickEvent(false);
                console.log("Anti-ClockWise: ","dis4mOrigin: ", dis4mOrigin, "initialDistance: ", initialDistance, "Diff", dis4mOrigin - initialDistance);
                initialDistance = dis4mOrigin;
            }


        }


        this.addEventsToElements();


    }



    render() {

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
            </div>
        );
    }

}

export default IpodMainMenu;