const initialState = {
    rootId: '',
    nodes: {},
    activeNodes: {},
}

const reducer = (state =initialState, action) => {
    switch (action.type) {
        case "SET_ROOT_NODE":
            return {
                ...state,
                rootId: action.rootId,
                activeNodes: { [action.rootId]: 'id' },
            }

        case "ADD_NODES":
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    ...action.nodes
                },
                activeNodes: {...state.activeNodes, ...action.nodeChildrenIds}
            }

        case "REMOVE_NODE":
            let activeNodes = { ...state.activeNodes }
            delete activeNodes[action.id]
            return {
                ...state,
                activeNodes,
            }

        case "ADD_NODE_CHILDREN_TO_ACTIVE":
            return {
                ...state,
                activeNodes: { ...state.activeNodes, ...action.nodesId},
            }

        default:
            return state;
    }
}

export default reducer;