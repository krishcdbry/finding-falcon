import React from 'react';
import { 
    createActionSaveToken,
    createActionPlanetsDownloaded,
    createActionVehiclesDownloaded, 
    createActionUpdateResult
} from '../actions/setupActions';
import {connect} from "react-redux";
import {Route} from 'react-router-dom';
import client from '../api/api';
import Chance from './chance';
import store from '../../store';
import Result from './result';
import { Link } from 'react-router-dom';

class App extends React.Component {

    constructor (context, props) {
        super(context, props);
        this.state = {
            selectedPlanets: this.props.selectedPlanets,
            result : this.props.result
        }
    }

    componentDidMount () {
        let {planetsDownloaded, vehiclesDownloaded} = this.props;

        return client.getPlanets((planetResponse) => {
            planetsDownloaded(planetResponse);
            return client.getVehicles((vehicleResponse) => {
                vehiclesDownloaded(vehicleResponse);
                return true;
            });
        });
    }

    findFalcon () {
        let {selectedPlanets, updateResult} = this.props;
        let planet_names = [], vehicle_names = [];
        for (let i=0; i<selectedPlanets.length; i++) {
            planet_names.push(selectedPlanets[i].planet.name);
            vehicle_names.push(selectedPlanets[i].vehicle.name);
        }

        let postObj = {
            planet_names,
            vehicle_names
        }

        return client.getToken({}, (response) => {
            let {token} = response;
            postObj['token'] = token;
            client.findFalcon(postObj, (response) => {
                updateResult(response);
                return;
            })
        })
      
    }

    activateButton () {
        let {selectedPlanets} = this.state;
        let count = 0;
        
        if (selectedPlanets.length == 0) {
            return true;
        }

        for(let i = 0; i < selectedPlanets.length; i++) {
            if(selectedPlanets[i].hasOwnProperty('vehicle')) {
                count++;
            }
        }

        return (count == 4) ? false : true; 
    }

    modifyRoute() {
        this.props.history.push('/result');
    }

    render () {
        store.subscribe(() => {
            this.setState({
                selectedPlanets : this.state.selectedPlanets,
                result : this.props.result
            })
        })

        if (this.state.result) {
           this.modifyRoute();
        }

        let chanceList = [];
        let {planets, vehicles} = this.props
        if (planets.length > 0 && vehicles.length > 0) {
                chanceList.push(
                    <Chance key='planet1' hj planetIdx={1}/>,
                    <Chance key='planet2' planetIdx={2}/>,
                    <Chance key='planet3' planetIdx={3}/>,
                    <Chance key='planet4' planetIdx={4}/>
                )
        }

        return (
            <div className="find-falcon-app">
                <h3>Select planets you want to search in:</h3>
                <div className="chance-list">
                    {chanceList} 
                </div>
                <div className="time-taken">
                    <h3>Time Taken :  {this.props.timeTaken}</h3>
                </div>
                <br/>
                <button type="button" 
                disabled={this.activateButton()} 
                onClick={this.findFalcon.bind(this)}>
                    Find falcon
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timeTaken : state.timeTaken,
        vehicles : state.vehicles,
        planets : state.planets,
        selectedPlanets : state.selectedPlanets,
        result : state.result
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveToken : (data) => {
            dispatch(createActionSaveToken(data));
        },
        planetsDownloaded : (data) => {
            dispatch(createActionPlanetsDownloaded(data));
        },
        vehiclesDownloaded : (data) => {
            dispatch(createActionVehiclesDownloaded(data));
        },
        updateResult : (data) => {
            dispatch(createActionUpdateResult(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
