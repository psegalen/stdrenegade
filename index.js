import { AppRegistry, YellowBox } from "react-native";
import App from "./src/App";

YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    ...[
        "RCTImageLoader",
        // Add module names here 👇, here 👆 or here 👈... 🤗
    ].map(module => `Module ${module} requires main queue setup`),
])

AppRegistry.registerComponent("stdrenegade", () => App);
