const showClass = needShow => Object.prototype.toString.call(needShow).slice(8, -1);

const date = function (timestamp = new Date()) {
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
	constructor({
		node = document.body,
		event = 'keydown',
		codes,
		callback,
		allowDelay = 1000
	}) {
		const self = this;
		self.node = node;
		self.event = event;
		self.codes = codes;
		self.callback = callback;
		self.allowDelay = allowDelay;
		self.keyValue = new Map([
			['Digit9', '数字九']
		])
		self.triggeredKeyCodes = new Set([]);
		self.timestamp = 0;
		self.removeEvent();
		self.addEvent();
	}
	fn(e) {
		const self = this;
		self.reset();
		self.triggeredKeyCodes.add(e.code);
		if (self.codes.every(key => self.triggeredKeyCodes.has(key))) {
			e.triggerTime = date().ms - self.timestamp;
			self.callback(e);
			self.timestamp = 0;
		} else {
			console.log(e);
			console.log(self.codes.map(keyCode => self.keyValue.get(keyCode)).join(',') + '没按完整')
		}
	}
	reset() {
		const self = this;
		let timestamp = date().ms;
		if (timestamp - self.timestamp > self.allowDelay) {
			self.triggeredKeyCodes = new Set([]);
			self.timestamp = timestamp;
		}
	}
	addEvent() {
		const self = this;
		self.node.addEventListener(self.event, function (e) {
			self.fn(e);
		}, false)
	}
	removeEvent() {
		const self = this;
		self.node.removeEventListener(self.event, function (e) {
			self.fn(e);
		}, false)
	}
}
