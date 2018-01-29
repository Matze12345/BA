export default function reducer(state={
                                    help: {
                                        size: "small",
                                    },
                                    fetching: false,
                                    fetched: false,
                                    error: null,
                                }, action) {

    switch (action.type) {
        case "FETCH_HELP_TRAIN": {
            console.log("FETCH_HELP_TRAIN");
            return {...state, fetching: true}
        }
        case "FETCH_HELP_TRAIN_REJECTED": {
            console.log("FETCH_HELP_TRAIN_REJECTED" + action);
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_HELP_TRAIN_FULFILLED": {
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