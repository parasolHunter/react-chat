import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import { redirect_to } from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form.js'

@connect(
    state => state.user,
    { login, redirect_to }
)
@imoocFrom
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }
    register() {
        this.props.redirect_to('/register')
        // this.props.history.push('/register')
    }
    handleLogin = () => {
        this.props.login(this.props.state)
    }
    render() {
        const props = this.props;
        return (
            // eslint-disable-next-line
            <div>
                {(this.props.redirectTo && this.props.redirectTo != '/login') ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => props.handleChange('user', v)}

                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type="password"
                            onChange={v => props.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleLogin} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>


            </div>
        )
    }
}

export default Login