const PLANETS_DOWNLOADED = "PLANETS_DOWNLOADED";
const VEHICLES_DOWNLOADED = "VEHICLES_DOWNLOADED";
const VEHICLE_SELECTED  = "VEHICLE_SELECTED";
const PLANET_SELECTED = "PLANET_SELECTED";
const PLANET_VEHICLE_ASSIGNED = "PLANET_VEHICLE_ASSIGNED";
const FIND_FALCON = "FIND_FALCON";
const UPDATE_TIME_TAKEN = "UPDATE_TIME_TAKEN";
const SAVE_TOKEN = "SAVE_TOKEN";
const UPDATE_RESULT = "UPDATE_RESULT";

function createActionSaveToken (data) {
    return {
        type: SAVE_TOKEN,
        data
    }
}
function createActionFindFalcon (data) {
    return {
        type : FIND_FALCON,
        data
    }
}

function createActionPlanetsDownloaded (data) {
    return {
        type : PLANETS_DOWNLOADED,
        data
    }
}

function createActionVehiclesDownloaded (data) {
    return {
        type: VEHICLES_DOWNLOADED,
        data
    }
}


function createActionPlanetSelected (data) {
    return {
        type : PLANET_SELECTED,
        data
    }
}

function createActionVehicleSelected (data) {
    return {
        type : VEHICLE_SELECTED,
        data
    }
}

function createActionPlanetVehicleSelected (data) {
    return {
        type : PLANET_VEHICLE_ASSIGNED,
        data
    }
}

function createActionUpdateTimeTaken (data) {
    return {
        type: UPDATE_TIME_TAKEN,
        data
    }
}

function createActionUpdateResult (data) {
    return {
        type: UPDATE_RESULT,
        data
    }
}


export {
    FIND_FALCON,
    PLANETS_DOWNLOADED,
    VEHICLES_DOWNLOADED,
    VEHICLE_SELECTED,
    PLANET_SELECTED,
    PLANET_VEHICLE_ASSIGNED,
    UPDATE_TIME_TAKEN,
    UPDATE_RESULT,

    createActionSaveToken,
    createActionPlanetsDownloaded,
    createActionVehiclesDownloaded,
    createActionVehicleSelected,
    createActionPlanetSelected,
    createActionPlanetVehicleSelected,
    createActionFindFalcon,
    createActionUpdateTimeTaken,
    createActionUpdateResult
}