import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Result extends React.Component {
    constructor (context, props) {
        super(context, props);
    }

    render () {
        let { result, timeTaken } = this.props
        
        let resultDiv = <div className="result">
            <h3>Ohhh! Failed to Find Falcon. <br/><br/>
             Time taken : {timeTaken}
             </h3>
        </div>

        if (result.status && result.planet_name) {
            resultDiv = <div className="result">
                <h3> Success! Congratulations on Finding Falcon. King Shan is might pleased <br/><br/>
                    Time taken : {timeTaken} <br/>
                    Planet found : {result.planet_name} 
                </h3>
            </div>
        }

        return (
            <h1>
                {resultDiv}
                <br/>
                <a href="/">
                    <button>Try again</button>
                </a>
            </h1>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        result : state.result,
        timeTaken : state.timeTaken
    }
}

const mapDispatchToProps = (action) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);

