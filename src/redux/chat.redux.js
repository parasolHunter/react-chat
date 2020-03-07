import axios from './../axios'
import { Toast } from 'antd-mobile'
import io from 'socket.io-client'
// const socket = io('ws://120.27.95.139:3000')
const socket = io('ws://localhost:3000')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, chatmsg: action.payload.msgs, users: action.payload.users, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length }
        case MSG_RECV:
            const n = action.payload.to === action.userid ? 1 : 0
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n }
        case MSG_READ:
            const { from, num } = action.payload
            return {
                ...state,
                chatmsg: state.chatmsg.map(v => ({ ...v, read: from === v.from ? true : v.read })),
                unread: state.unread - num >= 0 ? state.unread - num : 0
            }
        default:
            return state
    }
}
function msgList(msgs, users, userid) {
    return { type: 'MSG_LIST', payload: { msgs, users, userid } }
}
function msgRecv(data, userid) {
    return {
        type: 'MSG_RECV', payload: data, userid
    }
}
function msgRead({ from, userid, num }) {
    return {
        type: 'MSG_READ', payload: { from, userid, num }
    }
}
export function readMsg(from) {
    return async (dispatch, getState) => {
        const res = await axios.ajax({
            url: '/user/readmsg',
            method: 'post',
            data: { from },
        })
        const userid = getState().user._id
        if (res.code === 0) {
            dispatch(msgRead({ from, userid, num: res.num }))
        }
    }
}
export function sendMsg({ from, to, content }) {
    return dispatch => {
        Toast.loading('加载中', 0)
        socket.emit('sendmsg', { from, to, content })
        Toast.hide()
    }
}
export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', (data) => {
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}
export function getMsgList() {
    return (dispatch, getState) => {
        axios.ajax({
            url: '/user/getmsglist',
            method: 'get'
        }).then((res) => {
            if (res.code === 0) {
                const userid = getState().user._id
                dispatch(msgList(res.msgs, res.users, userid))
            }
        })
    }
}
