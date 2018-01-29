import config from '../../config/config'

export function fetchHelpTrain() {
    return {
        type: "FETCH_HELP_TRAIN"
    }
}

export function setHelpTrain(data) {
    return {
        type: "FETCH_HELP_TRAIN_FULFILLED",
        payload:  data
    }
}

export function helpTrainRejected(error) {
    return {
        type: "FETCH_HELP_TRAIN_REJECTED",
        payload: error
    }
}

export function fetchHelpTrainData(time, click, result) {
    return (dispatch) => {
        dispatch(fetchHelpTrain());
        return fetch(config.BASE_URL + 'helptrain', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                time: time,
                click: click,
                result: result,
            })
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    response.json().then(json => {
                        dispatch(setHelpTrain(json));
                    });
                } else {
                    console.log(response);
                    response.json().then(json => {
                        dispatch(helpTrainRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    console.log(error)
                    dispatch(helpTrainRejected(error));
                }
            );
    };
}