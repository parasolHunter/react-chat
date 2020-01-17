import React from 'react'
import axios from './../../axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'

@withRouter
@connect(
	null,
	{ loadData }
)
class AuthRoute extends React.Component {
	componentDidMount() {
		const publicList = ['/login', '/register']
		const pathname = this.props.location.pathname
		if (publicList.indexOf(pathname) > -1) {
			return null //在登录注册页，则不校验
		}
		// 获取用户信息
		axios.ajax({
			url: '/user/info',
			method: 'get'
		}).then(res => {
			if (res.code === 0) {
				// 有登录信息
				this.props.loadData(res.data)
			} else {
				Toast.hide()
				this.props.history.push('/login')
			}
		})
		// 用户的type 身份是boss还是牛人
		// 用户是否完善信息（选择头像 个人简介）		
	}
	render() {
		return null
	}

}
export default AuthRoute