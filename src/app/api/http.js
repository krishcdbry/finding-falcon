function helperConvertObjectToUrlEncoded(element, key = undefined, inputList = []) {
    if (typeof(element )== 'object') {
        for (let idx in element) {
            let subKey = (key) ? key + '[' + idx + ']' : idx;
            helperConvertObjectToUrlEncoded( element[idx], subKey, inputList );
        }
    } else {
        inputList.push(key + '=' + encodeURIComponent( element ));
    }
    
    return inputList.join('&');
}

class HTTP {
	constructor() {
		this._token = null;
    }
    
    setToken (token) {
        this._token = token;
    }

    getToken () {
        return this._token;
    }

    get (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.send(); 
    }

    post (url, callback, postData) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.send(JSON.stringify(postData)); 
    }
}

const HTTPClient = new HTTP();
export {
	HTTPClient
}