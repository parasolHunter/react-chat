import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WhiteSpace, Button, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { regisger, redirect_to } from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form.js'
@connect(
    state => state.user,
    { regisger, redirect_to }
)
@imoocFrom
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleRegister() {
        this.props.regisger(this.props.state)
    }
    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }
    render() {
        const RadioItem = Radio.RadioItem
        const props = this.props
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar icon={<Icon type="left" />} onLeftClick={() => this.props.redirect_to('/login')} mode="dark" >注册</NavBar>
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem
                        onChange={v => props.handleChange('user', v)}
                    >用户名</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={v => props.handleChange('pwd', v)}
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={v => props.handleChange('repeatpwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem
                        checked={this.props.state.type === 'genius'}
                        onChange={() => props.handleChange('type', 'genius')}
                    >
                        牛人
					</RadioItem>
                    <RadioItem
                        checked={this.props.state.type === 'boss'}
                        onChange={() => props.handleChange('type', 'boss')}
                    >
                        BOSS
					</RadioItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>注册 </Button>
                </List>
            </div>
        )
    }
}

export default Register