let tracker = "*://canvas.supinfo.com/api/v1/courses/*/quizzes/*/submissions/*/events"

window[typeof chrome !== "undefined" ? 'chrome' : 'browser'].webRequest.onBeforeRequest.addListener(
	(request) => {
		console.log('Block:' + request.url)

		if (request.method == "POST") {
			let body = request.requestBody

			if (body.raw) {
				let postedString = decodeURIComponent(
					String.fromCharCode.apply(null, new Uint8Array(body.raw[0].bytes))
				);

				try {
					let data = JSON.parse(postedString)
					data.quiz_submission_events.forEach((evt) => console.log('Event Type: ' + evt.event_type))

					let blockedEvents = localStorage.getItem('blocked_events') || 0
					
					//localStorage.setItem('blocked_events', blockedEvents += data.quiz_submission_events.length)
					localStorage.setItem('blocked_events', blockedEvents += 1)

				} catch(e) {
					console.log("Failed to parse posted string")
					console.log(postedString)
				}
			}
		}

		return { cancel: request.url.indexOf(tracker) != -1 };
	},
	{ urls: [tracker] },
	["blocking", "requestBody"]
);
