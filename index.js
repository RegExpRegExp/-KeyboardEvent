const showClass = needShow => Object.prototype.toString.call(needShow).slice(8, -1);

const date = function (timestamp) {
	return {
		DATE: new Date(timestamp),
		YY: new Date(timestamp).getFullYear(),
		M: new Date(timestamp).getMonth() + 1,
		MM: new Date(timestamp).getMonth() + 1 > 9 ? new Date(timestamp).getMonth() + 1 : '0' + (new Date(timestamp).getMonth() + 1),
		D: new Date(timestamp).getDate(),
		DD: new Date(timestamp).getDate() > 9 ? new Date(timestamp).getDate() : '0' + new Date(timestamp).getDate(),
		h: new Date(timestamp).getHours(),
		hh: new Date(timestamp).getHours() > 9 ? new Date(timestamp).getHours() : '0' + new Date(timestamp).getHours(),
		m: new Date(timestamp).getMinutes(),
		mm: new Date(timestamp).getMinutes() > 9 ? new Date(timestamp).getMinutes() : '0' + new Date(timestamp).getMinutes(),
		s: new Date(timestamp).getSeconds(),
		ss: new Date(timestamp).getSeconds() > 9 ? new Date(timestamp).getSeconds() : '0' + new Date(timestamp).getSeconds(),
		ms: new Date(timestamp).getTime()
	}
}

export default class keyboard {
	constructor(needKeyCodes, callback, event = 'keydown') {
		this.event = event;
		this.needKeyCodes = needKeyCodes;
		this.callback = callback;
		this.keyValue = new Map([
			[32, 'Space']
		])
		this.triggeredKeyCodes = new Set([]);
		this.timestamp = 0;
		this.removeEvent();
		this.addEvent();
	}
	fn(e) {
		this.reset();
		this.triggeredKeyCodes.add(e.keyCode);
		if (this.needKeyCodes.every(key => this.triggeredKeyCodes.has(key))) {
			this.callback()
		} else {
			console.log(this.needKeyCodes.map(keyCode => this.keyValue.get(keyCode)).join(',') + '没按完整')
		}
	}
	reset() {
		let timestamp = new Date().getTime();
		if (timestamp - this.timestamp > 1000) {
			this.triggeredKeyCodes = new Set([]);
			this.timestamp = timestamp;
		}
	}
	addEvent() {
		const that = this;
		document.body.addEventListener(this.event, function (e) {
			e.preventDefault();
			that.fn(e);
		}, false)
	}
	removeEvent() {
		const that = this;
		document.body.removeEventListener(this.event, function (e) {
			that.fn(e);
		}, false)
	}
}
