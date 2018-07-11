import config from '../../config/config'
import {setInitState, fetchInit} from "./initAction"

export function fetchClick() {
    return {
        type: "FETCH_CLICK_DATA"
    }
}

export function setClickData(data) {
    return {
        type: "FETCH_CLICK_DATA_FULFILLED",
        payload: data
    }
}

export function clickDataRejected(error) {
    return {
        type: "FETCH_CLICK_DATA_REJECTED",
        payload: error
    }
}

export function fetchClickData(path, data, time, nextPage) {
    return (dispatch) => {
        dispatch(fetchClick());
        return fetch(config.BASE_URL + path, {
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
                        //console.log(nextPage, path)
                        //if (path != "set3" || nextPage != "set3") {
                           // console.log("new page")
                            //dispatch(setInitState({form: [], status: true}));
                            window.location.assign("/#/" + nextPage)
                        //}
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