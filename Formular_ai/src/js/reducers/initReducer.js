export default function reducer(state={
                                    initR: {
                                        state: "",
                                    },
                                    fetching: false,
                                    fetched: false,
                                    error: null,
                                }, action) {

    switch (action.type) {
        case "FETCH_INIT": {
            console.log("FETCH_INIT");
            return {...state, fetching: true}
        }
        case "FETCH_INIT_REJECTED": {
            console.log("FETCH_INIT_REJECTED" + action);
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_INIT_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                initR: action.payload,
            }
        }
    }
    return state
}