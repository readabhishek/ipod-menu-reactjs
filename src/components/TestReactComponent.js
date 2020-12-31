import React from 'react';
import '../index.css';


class TestReactComponent extends React.Component {
    constructor(props) {
        super(props);


    }

    componentDidMount() {
        let link1 = document.getElementById("link1");
        link1.addEventListener('click', ev => {
            console.log('Clicked: ');
        });



    }



    render() {


        return(
            <div>
                <a id="link1" href="#" onClick={window.abc}>Click Me</a>
            </div>
        );
    }

}

export default TestReactComponent;