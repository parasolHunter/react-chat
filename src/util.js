export function getRedirectPath({ type, avatar }) {
	// 根据用户信息 返回跳转地址
	// 用户的type 身份是boss还是牛人
	// 用户是否完善信息（选择头像 个人简介）
	// user.type /boss /genius
	// user.avatar /bossinfo /geniusinfo 
	let url = (type === 'boss') ? '/boss' : '/genius'
	if (!avatar) {
		url += 'info'
	}
	return url
}

export function getChatId(userId, targetId) {
	return [userId, targetId].sort().join('_')
}