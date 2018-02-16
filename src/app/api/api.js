import * as config from './config';

import {HTTPClient} from './http';

class Api {
    constructor () {
        this.token = null;
        this._http = HTTPClient;
    }
 
    getToken (postData, callback) {
        HTTPClient.post(config.kPathGetToken, callback, postData);
    }

    getVehicles (callback) {
        HTTPClient.get(config.kPathGetVehicles, callback);
    }

    getPlanets (callback) {
        HTTPClient.get(config.kPathGetPlanets, callback);
    }

    findFalcon (postData, callback) {
        HTTPClient.post(config.kPathFindFalcon, callback, postData);
    }

}

const client = new Api();
export default client;