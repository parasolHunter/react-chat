import React from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
@connect(
    state => state
)
@withRouter
class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }
    render() {
        const Item = List.Item
        const Brief = Item.Brief
        const props = this.props
        const userid = props.user._id
        const users = props.chat.users
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        }).filter(v => (v[0].from === userid || v[0].to === userid))
        console.log(chatList)

        return (
            <div>
                {chatList.map(v => {
                    const lastItem = this.getLast(v)
                    const targetId = v[0].from === userid ? v[0].to : v[0].from
                    const unreadNum = v.filter(v => !v.read && v.to === userid).length
                    if (!users[targetId]) {
                        return null
                    }
                    return (
                        <List key={lastItem._id}>
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../img/${users[targetId].avatar}.png`)}
                                arrow={'horizontal'}
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {users[targetId].name}
                                <Brief >{lastItem.content}</Brief>
                            </Item>
                        </List>
                    )
                })}
            </div >
        )
    }
}

export default Msg