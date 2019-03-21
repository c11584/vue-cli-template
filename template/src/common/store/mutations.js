import * as types from './types'

export default {
    [types.LOGIN]: (state, data) => {
        state.token = data.token
    },

    [types.LOGOUT]: (state, data) => {
        state.token = null
    }
}
