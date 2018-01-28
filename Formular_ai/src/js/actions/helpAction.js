import config from '../../config/config'

export function fetchHelp() {
    return {
        type: "FETCH_HELP"
    }
}

export function setHelp(data) {
    return {
        type: "FETCH_HELP_FULFILLED",
        payload:  data
    }
}

export function helpRejected(error) {
    return {
        type: "FETCH_HELP_REJECTED",
        payload: error
    }
}

export function fetchHelpData(time, click, result, train) {
    return (dispatch) => {
        dispatch(fetchHelp());
        return fetch(config.BASE_URL + 'help', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                time: time,
                click: click,
                result: result,
                train: true
            })
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    response.json().then(json => {
                        dispatch(setHelp(json));
                    });
                } else {
                    console.log(response);
                    response.json().then(json => {
                        dispatch(helpRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    console.log(error)
                    dispatch(helpRejected(error));
                }
            );
    };
}