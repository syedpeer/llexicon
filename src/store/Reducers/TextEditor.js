import { ReduxActions } from "../../constants.js"
const { TEXT_EDITOR_SET, TEXT_EDITOR_CLEAR, REDUX_RESET } = ReduxActions

const DEFAULT_STATE_TEXT_EDITOR = {
  id: "NewEntry",
  clearedOn: "",
  title: "",
  html: "<p><br></p>",
  address: "",
  latitude: null,
  longitude: null,
  tags: [],
  rating: 0,
  _lastUpdated: "",
  EntryFiles: []
}

const TextEditor = (state = DEFAULT_STATE_TEXT_EDITOR, action) => {
  const { type, payload } = action
  switch (type) {
    case TEXT_EDITOR_SET:
      return { ...state, ...payload, _lastUpdated: new Date() }
    case TEXT_EDITOR_CLEAR:
      return { ...DEFAULT_STATE_TEXT_EDITOR, clearedOn: new Date() }
    case REDUX_RESET:
      return { ...DEFAULT_STATE_TEXT_EDITOR, clearedOn: new Date() }
    default:
      return state
  }
}

export { DEFAULT_STATE_TEXT_EDITOR, TextEditor }
