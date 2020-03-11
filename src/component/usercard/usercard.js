import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

@withRouter
class UserCard extends React.Component {
	static propTypes = {
		userlist: PropTypes.array.isRequired
	}
	handleClick = (v) => {
		this.props.history.push(`/chat/${v._id}`)
	}
	render() {
		const Header = Card.Header
		const Body = Card.Body
		return (
			<div id="usercard-page">
				<WingBlank>
					<WhiteSpace></WhiteSpace>
					{this.props.userlist.map(v => (
						v.avatar ? (<div key={v._id}>
							<Card onClick={() => this.handleClick(v)}>
								<Header
									title={v.user}
									thumb={require(`../img/${v.avatar}.png`)}
									extra={<span>{v.title}</span>}
								></Header>
								<Body>
									{v.type === 'boss' ? <div className="usercard-item">公司：{v.company}</div> : null}
									{v.desc.split('\n').map(d => (
										<div className="usercard-item" key={d}>{d}</div>
									))}
									{v.type === 'boss' ? <div className="usercard-item">薪资：{v.money}</div> : <div className="usercard-item">预期薪资：{v.money}</div>}
								</Body>
							</Card><WhiteSpace></WhiteSpace></div>) : null

					))}
				</WingBlank>
			</div>
		)


	}
}
export default UserCard

