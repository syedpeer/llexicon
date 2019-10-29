import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import storeFactory from "./store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import LoadingScreen from "./components/LoadingScreen"
import * as serviceWorker from "./serviceWorker"
import Persister from "./store/Persister"
import { getState, saveState } from "./store/Persister/persist"
const { NODE_ENV } = process.env

const initialState = getState()
const ReduxStore = storeFactory(initialState)

ReactDOM.render(
  <Provider store={ReduxStore}>
    <Persister />
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

if (NODE_ENV === "development") {
  serviceWorker.unregister()
} else {
  serviceWorker.register()
}
