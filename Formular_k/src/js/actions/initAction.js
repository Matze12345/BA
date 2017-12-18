import config from '../../config/config'

export function fetchInitState() {
    return {
        type: "FETCH_INIT"
    }
}

export function setInitState(data) {
    return {
        type: "FETCH_INIT_FULFILLED",
        payload:  data                   // jetzt ist der Request fertig --> nun wird der Reducer informiert und reagiert darauf
    }
}

export function initRejectedState(error) {
    return {
        type: "FETCH_INIT_REJECTED",
        payload: error
    }
}

// actions werden nacheinander getriggert
export function fetchInit(id, stars) {
    return (dispatch) => {
        dispatch(fetchInitState()); // setzt neuen Status, damit Kompnenten wissen dass Daten aktualisiert werden aber noch nicht da ist
        return fetch(config.BASE_URL + 'home', {   // REST call
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                stars: stars,
            })
        })
            .then(response => {   // response kommt zurück
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    response.json().then(json => { // umwandeln zu json
                        dispatch(setInitState(json));
                    });
                } else {
                    console.log(response);
                    response.json().then(json => {
                        dispatch(initRejectedState('Error on fetching')); // status FULFILLED setzten, alle Komponenten, die es interessiert, wissen nun dass die neuen Daten da sind
                                                                     // und bekommen diese über die Props mit, da sich der State geändert hat.
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    //  error.json().then(json => {
                    console.log(error)
                    dispatch(initRejectedState(error));
                    //throw error;
                    //});
                }
            );
    };
}