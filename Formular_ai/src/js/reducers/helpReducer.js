export default function reducer(state={
                                    help: {
                                        state: "",
                                    },
                                    fetching: false,
                                    fetched: false,
                                    error: null,
                                }, action) {

    switch (action.type) {
        case "FETCH_HELP": {
            console.log("FETCH_HELP");
            return {...state, fetching: true}
        }
        case "FETCH_HELP_REJECTED": {
            console.log("FETCH_HELP_REJECTED" + action);
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_HELP_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                help: action.payload,
            }
        }
    }
    return state
}