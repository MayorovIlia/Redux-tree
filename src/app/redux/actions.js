export const setRootNode = (rootId) => {
    return {
        type: 'SET_ROOT_NODE',
        rootId,
    }
}

export const onClickNode = (id, nodes, activeNodes) => {
    return {
        type: 'ON_CLICK_NODE',
        id,
        nodes,
        activeNodes,
    }
}

/* saga actions */
export const addNodeWithChildren = (id, nodes) => {
    return {
        type: 'ADD_NODE_WITH_CHILDREN',
        id,
        nodes,
    }
}

export const removeNodeChildren = (id, nodes, activeNodes) => {
    return {
        type: 'REMOVE_NODE_CHILDREN',
        id,
        nodes,
        activeNodes,
    }
}

export const addNodes = (nodes, nodeChildrenIds) => {
    return {
        type: 'ADD_NODES',
        nodes,
        nodeChildrenIds,
    }
}

export const removeNode = (id) => {
    return {
        type: 'REMOVE_NODE',
        id,
    }
}

export const addNodeChildrenToActive = (nodesId) => {
    return {
        type: 'ADD_NODE_CHILDREN_TO_ACTIVE',
        nodesId,
    }
}


