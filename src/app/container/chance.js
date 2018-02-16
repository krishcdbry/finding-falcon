import React from 'react';
import {connect} from "react-redux";
import { 
    createActionVehicleSelected, 
    createActionPlanetSelected, 
    createActionPlanetVehicleSelected,
    createActionUpdateTimeTaken
} from '../actions/setupActions';
import store from '../../store';

class Chance extends React.Component {
    constructor(context, props) {
        super(context, props);
        
        this.state = {
            selectedPlanet: false,
            selectedVehicle : null,
            vehicles : this.props.vehicles,
            planets : this.props.planets
        }
    }

    getPlanetByName(name) {
        let {planets} = this.props;
        for (let i=0; i < planets.length; i++) {
            if (planets[i].name == name) {
                return planets[i];
            }
        }
        return {};
    }

    isVehicleAvailable(item) {
        let {selectedVehicles, planets, planetIdx} = this.props; 
        let currentPlanet = planets[planetIdx];
        let currentVehicle = item;
        return item.total_no-selectedVehicles[item.name] > 0 && currentVehicle.max_distance >= currentPlanet.distance
    }

    getVehiclePendingCount(item) {
        let {selectedVehicles} = this.props;
        return item.total_no-selectedVehicles[item.name];
    }

    isPlanetSelected(item) {
        let {selectedPlanets} = this.props;
        if (selectedPlanets.length == 0) {
            return false;
        }
        for (let i=0; i < selectedPlanets.length; i++) {
            if (selectedPlanets[i].planet.name == item) {
                return true;
            }
        }
        return false;
    }

    onChangePlanet (event) {
    
        let {planetSelected, planetIdx, planets} = this.props;

        this.setState({
            selectedPlanet: event.target.value,
            selectedVehicle: null
        });

        let selectedPlanet = {
            planetIdx,
            planet : planets[event.target.value]
        }
    
        planetSelected(selectedPlanet);
    }

    onChangeVehicle (event)  {
        let {vehicleSelected, 
            planetVehicleAssigned, 
            updateTimeTaken,
            vehicles,
            planetIdx
        } = this.props;

        this.setState({
            selectedVehicle: event.target.value
        });

        let selectedVehicle = vehicles[event.target.value];

        let selectedVehicleObj = {
            old : (this.state.selectedVehicle) ? vehicles[this.state.selectedVehicle].name : "",
            new : selectedVehicle.name,
            planetIdx 
        }
        
        let vehicleAssigendObj = {
            vehicle : selectedVehicle,
            planetIdx
        }

        vehicleSelected(selectedVehicleObj);
        planetVehicleAssigned(vehicleAssigendObj);
        updateTimeTaken();
    }

    render() {

        store.subscribe(() => {
            this.setState({
                vehicles : this.state.vehicles
            })
        });

        let {planetIdx} = this.props;

        let planetList = [
            <option key={planetIdx+"default"}>
                Select
            </option>
        ];

        for (let i=0; i<this.state.planets.length; i++) {
            let item = this.state.planets[i];
            planetList.push(
                <option 
                key={item.name} 
                mo={item.name}
                disabled={this.isPlanetSelected(item.name)}
                value={i}>
                    {item.name}
                </option>
            )
        }

        let vehicleListHtml = (this.state.selectedPlanet) ? this.state.vehicles.map((item, idx) => {
            let count = this.getVehiclePendingCount(item);
            let available = this.isVehicleAvailable(item);
            return <div key={item.name}>
                <input 
                type="radio" 
                name={planetIdx} 
                value={idx} 
                checked={this.state.selectedVehicle==idx}
                onChange={this.onChangeVehicle.bind(this)}
                disabled={!available}/> 
                {item.name} ({count})
            </div>
        }) : '';

        return (
            <div className="chance">
                Destination {planetIdx} <br/>
                <div className="select-destionation">
                    <select className="select-planet" 
                    value={this.state.selectedPlanet}
                    selected={this.state.selectedPlanet != false}
                    onChange={this.onChangePlanet.bind(this)}>
                        {planetList}
                    </select>
                </div>
                <br/>
                {vehicleListHtml}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        vehicles : state.vehicles,
        planets : state.planets,
        selectedVehicles : state.selectedVehicles,
        selectedPlanets : state.selectedPlanets
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        planetSelected : (data) => {
            dispatch(createActionPlanetSelected(data));
        },
        vehicleSelected : (data) => {
            dispatch(createActionVehicleSelected(data));
        },
        planetVehicleAssigned : (data) => {
            dispatch(createActionPlanetVehicleSelected(data))
        },
        updateTimeTaken : (data) => {
            dispatch(createActionUpdateTimeTaken(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chance);
