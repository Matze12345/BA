import config from '../../config/config'
import { fetchInit } from "./initAction"

export function fetchClick() {
    return {
        type: "FETCH_CLICK_DATA"
    }
}

export function setClickData(data) {
    return {
        type: "FETCH_CLICK_DATA_FULFILLED",
        payload:  data
    }
}

export function clickDataRejected(error) {
    return {
        type: "FETCH_CLICK_DATA_REJECTED",
        payload: error
    }
}

export function fetchClickData(data, time) {
    return (dispatch) => {
        dispatch(fetchClick());
        return fetch(config.BASE_URL + 'home', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: data,
                time: time,
            })
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    //console.log(response);
                    response.json().then(json => {
                        dispatch(setClickData(json));
                        dispatch(fetchInit());
                    });
                } else {
                    //console.log(response);
                    response.json().then(json => {
                        dispatch(clickDataRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    //console.log(error)
                    dispatch(clickDataRejected(error));
                }
            );
    };
}