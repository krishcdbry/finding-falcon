import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.history.push('/app');
        }, 500);
    }

    render () {
        return (
            <div className="finding-falcon">
                <h1> Finding Falcon </h1>
            </div>
        )
    }
}

export default Home;