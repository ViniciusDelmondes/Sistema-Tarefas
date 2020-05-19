import { combineReducers } from 'redux'

import { tarefasReducer, tarefaReducer } from './tarefasReducer'

const mainReducer = combineReducers({
    tarefas: tarefaReducer
})

export default mainReducer;