import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from 'reducers/userReducer'
import loginReducer from 'reducers/loginReducer'
import projectReducer from 'reducers/projectReducer'

const reducer = combineReducers({
  users: userReducer,
  login: loginReducer,
  projects: projectReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store