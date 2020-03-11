import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
import QueueAnim from 'rc-queue-anim'
@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
@withRouter
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '' }
    }
    componentDidMount() {
        console.log(this.props)
        if (!this.props.chat.chatmsg.length && !Object.keys(this.props.chat.users).length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    componentDidUpdate() {
        this.initBox()
        window.addEventListener('resize', () => {
            this.initBox()
        });

    }
    componentWillUnmount() {
        let to = this.props.match.params.user
        this.props.readMsg(to)
    }
    initBox() {
        var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
        var header = document.getElementById('header')
        var footer = document.getElementById('footer')
        var middleC = document.getElementById('middleC')
        var emojiBox = document.getElementById('emojiBox')
        var contentHeight = document.getElementById('contentHeight')

        var sult = ''
        if (header && footer) {
            sult = h - header.offsetHeight - footer.offsetHeight - 10
        }
        if (middleC) {
            middleC.style.height = sult + 'px'
            if (contentHeight) {//contentHeight.scrollHeight 里面div的实际高度
                middleC.scrollTop = contentHeight.scrollHeight;  //网页可见高度
            }
        }
    }
    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    handleSumbit() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const content = this.state.text
        if (!content) {
            return
        }
        this.props.sendMsg({ from, to, content })
        this.setState({ text: '' })
    }
    render() {
        const emoji_smileys = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))

        const emoji_hand = '🤲 👐 🙌 👏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚 🖐 🖖 👋 🤙 💪🖕 ✍️ 🙏'
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))

        const emoji_people = '👶 👧 🧒 👦 👩 🧑 👨 👵 🧓 👴 👲 👳‍♀️ 👳‍♂️ 🧕 🧔 👱‍♂️ 👱‍♀️ 👮‍♀️ 👮‍♂️ 👷‍♀️ 👷‍♂️ 💂‍♀️ 💂‍♂️ 🕵️‍♀️ 🕵️‍♂️ 👩‍⚕️ 👨‍⚕️ 👩‍🌾 👨‍🌾 👩‍🍳 👨‍🍳 👩‍🎓 👨‍🎓 👩‍🎤 👨‍🎤 👩‍🏫 👨‍🏫 👩‍🏭 👨‍🏭 👩‍💻 👨‍💻 👩‍💼 👨‍💼 👩‍🔧 👨‍🔧 👩‍🔬 👨‍🔬 👩‍🎨 👨‍🎨 👩‍🚒 👨‍🚒 👩‍✈️ 👨‍✈️ 👩‍🚀 👨‍🚀 👩‍⚖️ 👨‍⚖️ 👰 🤵 👸 🤴 🤶 🎅 🧙‍♀️ 🧙‍♂️ 🧝‍♀️ 🧝‍♂️ 🧛‍♀️ 🧛‍♂️ 🧟‍♀️ 🧟‍♂️ 🧞‍♀️ 🧞‍♂️ 🧜‍♀️ 🧜‍♂️ 🧚‍♀️ 🧚‍♂️ 👼 🤰 🤱 🙇‍♀️ 🙇‍♂️ 💁‍♀️ 💁‍♂️ 🙅‍♀️ 🙅‍♂️ 🙆‍♀️ 🙆‍♂️ 🙋‍♀️ 🙋‍♂️ 🤦‍♀️ 🤦‍♂️ 🤷‍♀️ 🤷‍♂️ 🙎‍♀️ 🙎‍♂️ 🙍‍♀️ 🙍‍♂️ 💇‍♀️ 💇‍♂️ 💆‍♀️ 💆‍♂️ 🧖‍♀️ 🧖‍♂️ 💅 🤳 💃 🕺 👯‍♀️ 👯‍♂️ 🕴 🚶‍♀️ 🚶‍♂️ 🏃‍♀️ 🏃‍♂️ 👫 👭 👬 💑 👩‍❤️‍👩 👨‍❤️‍👨 💏 👩‍❤️‍💋‍👩 👨‍❤️‍💋‍👨 👪 👨‍👩‍👧 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧 👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 👨‍👨‍👧‍👧 👩‍👦 👩‍👧 👩‍👧‍👦 👩‍👦‍👦 👩‍👧‍👧 👨‍👦 👨‍👧 👨‍👧‍👦 👨‍👦‍👦 👨‍👧‍👧'
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))

        const emoji_plant = '🐶 🐱 🐭 🐹 🐰 🦊 🦝 🐻 🐼 🦘 🦡 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦢 🦅 🦉 🦚 🦜 🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐚 🐞 🐜 🦗 🕷 🕸 🦂 🦟 🦠 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦀 🐡 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🐘 🦏 🦛 🐪 🐫 🦙 🦒 🐃 🐂 🐄 🐎 🐖 🐏 🐑 🐐 🦌 🐕 🐩 🐈 🐓 🦃 🕊 🐇 🐁 🐀 🐿 🦔 🐾 🐉 🐲 🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘️ 🍀 🎍 🎋 🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌜 🌚 🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌙 🌎 🌍 🌏 💫 ⭐️ 🌟 ✨ ⚡️ ☄️ 💥 🔥 🌪 🌈 ☀️ 🌤 ⛅️ 🌥 ☁️ 🌦 🌧 ⛈ 🌩 🌨 ❄️ ☃️ ⛄️ 🌬 💨 💧 💦 ☔️ ☂️ 🌊 🌫'
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))

        let emojis = []
        emojis = emojis.concat(emoji_smileys, emoji_hand, emoji_people, emoji_plant)

        const Item = List.Item
        const props = this.props
        const user = props.user
        const chat = props.chat

        const userid = props.match.params.user
        const users = chat.users
        if (!users[userid]) {
            return null
        }
        const chatid = getChatId(userid, user._id)
        const chatmsgs = chat.chatmsg.filter(v => v.chatid === chatid)
        return (
            <div id="chat-page">
                <NavBar id="header" icon={<Icon type="left" />} onLeftClick={() => props.history.goBack()} leftContent={<span style={{ fontSize: '20px' }}>{users[userid].name}</span>} mode='dark'></NavBar>
                <div id="middleC" className="page-content" >
                    <div id="contentHeight">
                        <QueueAnim delay={100} type='left'>
                            {chatmsgs.map(v => {
                                const avatar = require(`../img/${users[v.from].avatar}.png`)
                                return v.from == userid ? (
                                    <List key={v._id} >
                                        <Item
                                            multipleLine
                                            wrap={true}
                                            thumb={avatar}
                                        >{v.content}</Item>
                                    </List>
                                ) : (
                                        <List key={v._id} >
                                            <Item
                                                multipleLine
                                                wrap={true}
                                                extra={<img alt="头像" src={avatar} />}
                                                className='chat-me'>{v.content}</Item>
                                        </List >
                                    )
                            })}
                        </QueueAnim>
                    </div>
                </div>
                <div id="footer" className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({ text: v })
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{ marginRight: 15 }}
                                        onClick={() => {
                                            this.setState({ showEmoji: !this.state.showEmoji })
                                            this.fixCarousel()
                                        }}
                                    >😄</span>
                                    <span onClick={() => this.handleSumbit()}>发送</span>
                                </div>
                            }
                        >信息</InputItem>
                    </List>
                    {this.state.showEmoji ? <Grid
                        id="emojiBox"
                        data={emojis}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel
                        onClick={
                            el => {
                                this.setState({ text: this.state.text + el.text })
                            }
                        }
                    ></Grid> : null}

                </div>
            </div>
        )
    }
}

export default Chat