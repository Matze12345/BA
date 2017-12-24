import config from '../../config/config'

export function fetchInitState() {
    return {
        type: "FETCH_INIT"
    }
}

export function setInitState(data) {
    return {
        type: "FETCH_INIT_FULFILLED",
        payload:  data
    }
}

export function initRejectedState(error) {
    return {
        type: "FETCH_INIT_REJECTED",
        payload: error
    }
}

export function fetchInit(ele1, ele2, ele3, ele4, ele5, ele6) {
    return (dispatch) => {
        dispatch(fetchInitState());
        return fetch(config.BASE_URL + 'home', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ele1: ele1,
                ele2: ele2,
                ele3: ele3,
                ele4: ele4,
                ele5: ele5,
                ele6: ele6,
            })
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    response.json().then(json => {
                        dispatch(setInitState(json));
                    });
                } else {
                    console.log(response);
                    response.json().then(json => {
                        dispatch(initRejectedState('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    console.log(error)
                    dispatch(initRejectedState(error));
                }
            );
    };
}