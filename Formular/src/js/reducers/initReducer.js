export default function reducer(state={    // reducer schaut Komponenten an, die mit ihm verbunden sind
                                    initR: {
                                        id: "",
                                        labelCol: "",
                                        inputCol: "",
                                        size: "",
                                    },
                                    fetching: false,
                                    fetched: false,
                                    error: null,
                                }, action) {

    switch (action.type) {
        case "FETCH_INIT": {
            console.log("FETCH_INIT");
            return {...state, fetching: true} // im fetching zustand daher true
        }
        case "FETCH_INIT_REJECTED": {
            console.log("FETCH_INIT_REJECTED" + action);
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_INIT_FULFILLED": {  // ...state: state von oben: nimmt alle States von oben und ändert jene, die geändert werden sollen.
            return {                    // initR wurde nun neu gesetzt. Alle Komponenten, die verbunden sind, erfahren dies und rendern neu.
                ...state,
                fetching: false,   // fetching false: Fertig
                fetched: true,     // fetched ist nun fertig
                initR: action.payload,
            }
        }
    }
    return state
}