import { createStore, applyMiddleware } from "redux"
import tree from './reducers'
import 'regenerator-runtime/runtime'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	return {
		...createStore(
			tree,
			applyMiddleware(sagaMiddleware)
		),
		runSaga: sagaMiddleware.run(rootSaga)
	}
}

export default configureStore;