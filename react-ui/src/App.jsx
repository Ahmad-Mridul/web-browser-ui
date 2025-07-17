import { useEffect } from "react";
import "./App.css";

function App() {
	useEffect(() => {
		if (typeof QWebChannel === "undefined") {
			console.error("QWebChannel is not defined — make sure qwebchannel.js is loaded!");
			return;
		}
		new QWebChannel(qt.webChannelTransport, (channel) => {
			window.bridge = channel.objects.bridge;

			// Call a C++ slot from JS
			// window.bridge.log("Clicked");

			// Listen to a signal from C++
			window.bridge.notify.connect((msg) => {
				console.log("Received signal from C++:", msg);
			});
		});
	}, []);

	return (
		<>
			<button onClick={() => window.bridge.showAlert("test alert")}>
				Send Log to Qt
			</button>
		</>
	);
}

export default App;
