import axios from './../axios'

const USER_LIST = 'USER_LIST'

const initState = {
	userlist: []
}

export function chatuser(state = initState, action) {
	switch (action.type) {
		case USER_LIST:
			return { ...state, userlist: action.payload }
		default:
			return state
	}
}

function userList(data) {
	return { type: USER_LIST, payload: data }
}

export function getUserList(type) {
	return dispatch => {
		// 获取用户信息
		axios.ajax({
			url: '/user/list?type=' + type,
			method: 'get'
		}).then(res => {
				if (res.code === 0) {
					// 有登录信息
					dispatch(userList(res.data))
				}
			})
	}
}






