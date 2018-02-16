import {
    SAVE_TOKEN,
    PLANETS_DOWNLOADED,
    VEHICLES_DOWNLOADED,
    PLANET_SELECTED,
    VEHICLE_SELECTED,
    PLANET_VEHICLE_ASSIGNED,
    UPDATE_TIME_TAKEN,
    UPDATE_RESULT
} from '../actions/setupActions';

let kInitialState = {
    token : null,
    planets : [],
    vehicles : [],
    selectedPlanets: [],
    selectedVehicles : [],
    timeTaken : 0,
    result : null,
}

const setupReducer = (state = kInitialState, action) => {
    switch (action.type) {

        case SAVE_TOKEN : {
            let token = action.data;
            state = Object.assign({}, state, {token});
            return state;
        }

        case PLANETS_DOWNLOADED : {
            let planets = action.data;
            state = Object.assign({}, state, {planets});
            return state;
        }

        case VEHICLES_DOWNLOADED : {
            let vehicles = action.data;
            let selectedVehicles = {};

            for (let i = 0; i < vehicles.length; i++) {
               selectedVehicles[vehicles[i].name] = 0;     
            }

            state = Object.assign({}, state, {vehicles, selectedVehicles});

            return state;
        }

        case PLANET_SELECTED: {
            let planet = action.data;
            let {selectedPlanets} = state;
        
            for (let i = 0; i < selectedPlanets.length; i++) {
                if (selectedPlanets[i].planetIdx == planet.planetIdx) {
                    selectedPlanets.splice(i, 1);
                }
            }

            selectedPlanets.push(planet);
            state = Object.assign({}, state, {selectedPlanets});
            return state;
        }

        case VEHICLE_SELECTED: {
            let vehicle = action.data;  
            let {selectedVehicles} = state;

            if (selectedVehicles.hasOwnProperty(vehicle.old)) {
                selectedVehicles[vehicle.old]--;
            }

            if (selectedVehicles.hasOwnProperty(vehicle.new)) {
                selectedVehicles[vehicle.new]++;
            }

            state = Object.assign({}, state, {selectedVehicles});
            return state;
        }

        case PLANET_VEHICLE_ASSIGNED: {
            let {planetIdx, vehicle} = action.data;  
            let {selectedPlanets} = state;

            for(let i = 0; i < selectedPlanets.length; i++) {
                if (selectedPlanets[i].planetIdx == planetIdx) {
                    selectedPlanets[i].vehicle = vehicle;
                }
            }

            state = Object.assign({}, state, {selectedPlanets});
            return state;
        }

        case UPDATE_TIME_TAKEN : {
            let {selectedPlanets} = state;
            let timeTaken = 0;
            for(let i = 0; i < selectedPlanets.length; i++) {
                let planet = selectedPlanets[i];
                if (planet.hasOwnProperty('planet') && planet.hasOwnProperty('vehicle')) {
                    let distance = selectedPlanets[i].planet.distance;
                    let speed = selectedPlanets[i].vehicle.speed;
                    timeTaken += distance/speed;
                }
            }
            state = Object.assign({}, state, {selectedPlanets, timeTaken});
            return state;
        }
        
        case UPDATE_RESULT : {
            let result = action;
            state = Object.assign({}, state, {result});
            return state;
        }

        default:
            return state;

    }
}

export default setupReducer;