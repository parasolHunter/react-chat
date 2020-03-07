import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal, Button, WingBlank } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
	state => state,
	{ logoutSubmit }
)
class User extends React.Component {
	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
	}
	logout() {
		const alert = Modal.alert
		const alertInstance = alert('注销', '确认退出登录吗???', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '确认', onPress: () => {
					// cookies.set("firstName","secondName",{expires: 1, secure: true, domain: 'localhost:3000'});//Expires after 1 day
					// cookies.get("firstName");//Returns cookie value
					browserCookie.erase('userid')//Removes cookie
					this.props.logoutSubmit()
				}
			}
		])
		setTimeout(() => {
			alertInstance.close();//auto close
		}, 5000);
	}
	render() {
		const props = this.props
		const user = props.user
		const Item = List.Item
		const Brief = Item.Brief
		console.log(props)
		return user.user ? (
			<div>
				<Result
					img={<img src={require(`../img/${user.avatar}.png`)} style={{ width: 50 }} alt="" />}
					title={user.user}
					message={user.type === 'boss' ? user.company : null}
				/>
				<List renderHeader={() => '简介'}>
					<Item
						multipleLine
					>
						{/* multipleLine——超出换行 */}
						{user.title}
						{user.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
						{user.money ? <Brief>薪资:{user.money}</Brief> : null}
					</Item>

				</List>
				<WhiteSpace></WhiteSpace>
				<WhiteSpace></WhiteSpace>
				<WhiteSpace></WhiteSpace>
				<WingBlank>
					<Button onClick={this.logout}>退出登录</Button>
				</WingBlank>
			</div>
		) : <Redirect to={user.redirectTo} />

	}
}


export default User