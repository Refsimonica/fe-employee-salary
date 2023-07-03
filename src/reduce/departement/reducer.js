import { 
    START_FETCHING_DATA,
    ERROR_FETCHING_DATA, 
    SUCCESS_FETCHING_DATA, 
    SET_PAGE, 
    SET_KEYWORD,
    SET_LIMIT,
    NEXT_PAGE, 
    PREV_PAGE,
    PREVIEW_IMAGE,
    SUCCESS_STORE_DATA, 
    ERROR_STORE_DATA, 
    SET_STATUS,
    SET_INPUT

} from './constants';

const statuslist = { idle: 'idle', process: 'process', success: 'success', error: 'error' }

const initialState = {
    id: '', 
    data: [],
    currentPage: 1, 
    totalItems: -1,
    perPage: 10,
    keyword: '',
    maxPageLimit: 5,
    minPageLimit: 0,
    status: statuslist.idle, 
    message: '', 
    input : '', 
    imagePreview : ''
};

export default function reducer(state = initialState, action) {

    switch(action.type) {

        case START_FETCHING_DATA:
            return {...state, status: statuslist.process, data: [], message: statuslist.process}

        case SUCCESS_FETCHING_DATA:
            return {...state, data: action.data, totalItems: action.count, status: statuslist.success, message: action.message}

        case ERROR_FETCHING_DATA:
            return {...state, status: statuslist.error, message: action.err}

        case SET_PAGE:
            if(action.currentPage >= state.maxPageLimit)
                return {...state, currentPage: action.currentPage, minPageLimit: state.minPageLimit + 1, maxPageLimit: state.maxPageLimit + 1}

            return {...state, currentPage: action.currentPage}

        case SET_KEYWORD:
            return {...state, keyword: action.keyword, category: '', tags: []}

        case SET_LIMIT:
            return {...state, perPage: action.limit, currentPage: ''}

        case NEXT_PAGE:
            if ((state.currentPage + 1) >= state.maxPageLimit) 
                return {...state, currentPage: state.currentPage + 1, minPageLimit: state.minPageLimit + 1, maxPageLimit: state.maxPageLimit + 1}
            
            return {...state, currentPage: state.currentPage + 1}

        case PREV_PAGE:
            let page = state.currentPage <= 1 ? 1 : state.currentPage - 1;
            let minLimit = state.minPageLimit <= 1 ? 1 : state.minPageLimit - 1;

            if(page > 5)
                return {...state, currentPage: page, minPageLimit: minLimit, maxPageLimit: state.maxPageLimit - 1}

            return {...state, currentPage: page, minPageLimit: 0, maxPageLimit: 5}

        case SET_INPUT:
            return {...state, input: action.dataForm}

        case SET_STATUS:
            return {...state, status: action.status, message: action.message}

        case PREVIEW_IMAGE:
            return {...state, data: [], totalItems: '', status: statuslist.idle, message: '', imagePreview: action.image}

        case SUCCESS_STORE_DATA:
            return {...state, status: statuslist.success, data: action.result, currentPage: 1, totalItems: -1, perPage: 10, keyword: ''}

        case ERROR_STORE_DATA:
            return {...state, status: statuslist.error, message: action.error.message}

        default:
            return state;

    }
}