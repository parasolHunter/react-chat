import axios from './../axios'
import { getRedirectPath } from '../util'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const REDIRECT_TO = 'REDIRECT_TO'
const initState = {
	redirectTo: '',
	msg: '',
	user: '',
	type: ''
}
// reducer
export function user(state = initState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
		case LOAD_DATA:
			return { ...state, redirectTo: getRedirectPath(action.payload), ...action.payload }
		case ERROR_MSG:
			return { ...state, isAuth: false, msg: action.msg }
		case LOGOUT:
			return { ...initState, redirectTo: '/login' }
		case REDIRECT_TO:
			return { ...state, redirectTo: action.str }
		default:
			return state
	}
}

function authSuccess(obj) {
	const { pwd, ...data } = obj;
	return { type: AUTH_SUCCESS, payload: data }
}
function errorMsg(msg) {
	return { msg, type: ERROR_MSG }
}

export function loadData(userinfo) {
	return { type: LOAD_DATA, payload: userinfo }
}

export function logoutSubmit() {
	return { type: LOGOUT }
}

export function setRedirect(str) {
	return {
		type: REDIRECT_TO,
		str: str
	}
}

export function update(data) {
	return dispatch => {
		axios.ajax({
			url: '/user/update',
			method: 'post',
			data,
		}).then((res) => {
			if (res.code === 0) {
				dispatch(authSuccess(res.data))
			} else {
				dispatch(errorMsg(res.msg))
			}
		})
	}
}
export function login({ user, pwd }) {
	if (!user || !pwd) {
		return errorMsg('用户密码必须输入')
	}
	return dispatch => {
		axios.ajax({
			url: '/user/login',
			method: 'post',
			data: {
				user, pwd
			},
		}).then((res) => {
			if (res.code === 0) {
				// dispatch(registerSuccess({user,pwd,type}))
				// res.map((item, index) => {
				//     item.key = index;
				// })
				dispatch(authSuccess(res.data))
			} else {
				dispatch(errorMsg(res.msg))
			}
		})
	}
}

export function regisger({ user, pwd, repeatpwd, type }) {
	if (!user || !pwd || !type) {
		return errorMsg('用户名密码必须输入')
	}
	if (pwd !== repeatpwd) {
		return errorMsg('密码不一致')
	}
	return dispatch => {
		axios.ajax({
			url: '/user/register',
			method: 'post',
			data: {
				user, pwd, type
			},
		}).then(res => {
			if (res.code === 0) {
				dispatch(authSuccess({ user, pwd, type }))
			} else {
				dispatch(errorMsg(res.msg))
			}
		})
	}
}

export function redirect_to(str) {
	return dispatch => {
		dispatch(setRedirect(str))
	}
}