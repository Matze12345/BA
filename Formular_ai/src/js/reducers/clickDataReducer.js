export default function reducer(state={
                                    clickData: {
                                        state: "",
                                    },
                                    fetching: false,
                                    fetched: false,
                                    error: null,
                                }, action) {

    switch (action.type) {
        case "FETCH_CLICK_DATA": {
            console.log("FETCH_CLICK_DATA");
            return {...state, fetching: true}
        }
        case "FETCH_CLICK_DATA_REJECTED": {
            console.log("FETCH_CLICK_DATA_REJECTED" + action);
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_CLICK_DATA_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                clickData: action.payload,
            }
        }
    }
    return state
}