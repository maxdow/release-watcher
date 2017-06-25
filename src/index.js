import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

const node = document.getElementById("root")

import App from "./components"

if (process.env.NODE_ENV === "production") {
  ReactDOM.render(<App />, node)
} else {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    node
  )
  if (module.hot) {
    module.hot.accept("./components", () => {
      const NextApp = require("./components").default
      ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        node
      )
    })
  }
}
