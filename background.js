let tracker = "https://canvas.supinfo.com/api/v1/courses/*/quizzes/*/submissions/*/events"
window[typeof chrome !== "undefined" ? 'chrome' : 'browser'].webRequest.onBeforeRequest.addListener(
	(request) => {
		console.log('Block:' + request.url);
		console.log('Remove localstorage qla_events');
		localStorage.removeItem('qla_events');
		return { cancel: true };
	},
	{ urls: [tracker] },
	["blocking", "requestBody"]
);
