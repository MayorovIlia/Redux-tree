import Api from '../api'
import { all, takeLatest, takeEvery, put } from 'redux-saga/effects'
import { addNodes, removeNode, addNodeWithChildren, removeNodeChildren, addNodeChildrenToActive } from './actions'

function* handleNodeClick({ id, nodes, activeNodes }) {
    const node = nodes[id]
    const nodeChildren = node && node['children']

    // if node have children and not in active nodes
    if (nodeChildren.length > 0 && !activeNodes.hasOwnProperty(nodeChildren[0])) {
        // if no nodes data - get it from api
        if(!nodes.hasOwnProperty(nodeChildren[0])){
            yield put(addNodeWithChildren(id, nodes))
        } 
        // add nodes to active
        else {
            let childrenNodesIds = {}
            nodeChildren.forEach(childId => childrenNodesIds[childId] = 'id')
            yield put(addNodeChildrenToActive(childrenNodesIds))
        }
    }
    // otherwise remove
    else {
        // if node have children - remove children recursively
        if (nodeChildren && nodeChildren.length > 0) {
            for (let childId of nodeChildren) {                
                yield put(removeNodeChildren(childId, nodes, activeNodes))
            }
        }
    }
}

function* handleAddNodeWithChildren({ id, nodes}) {
    let childrenNode = {}
    if(!nodes.hasOwnProperty(id)){
        childrenNode = yield Api.getNodeChildrenIds(id)
    } else {
        childrenNode['nodes'] = nodes[id]['children']
    }

    const nodeChildren = childrenNode['nodes']
    
    // keep parent node 
    let nodeWithDescendants = { [id]: {id, 'children':nodeChildren}}
    let nodeChildrenIds = {}

    // if node have children - add children
    if (nodeChildren && nodeChildren.length > 0) {
        for (let childId of nodeChildren) {
            const childrenNode = yield Api.getNodeChildrenIds(childId)
            const nodeChildChildren = childrenNode['nodes']
            nodeWithDescendants[childId] = {id: childId, 'children': nodeChildChildren}    
            nodeChildrenIds[childId] = 'id'
        }
    }

    // add nodes
    yield put(addNodes(nodeWithDescendants, nodeChildrenIds))
}

// recursively remove the node and all it's children
function* handleRemoveNodeChildren({ id, nodes, activeNodes }) {
    const nodeActiveIndex = activeNodes.hasOwnProperty(id)

    if(nodeActiveIndex){
        const node = nodes[id]
        const nodeChildren = node && node['children']
        //remove the node from active nodes
        yield put(removeNode(id))
        // if node have children - remove children
        if (nodeChildren && nodeChildren.length > 0) {
            for (let childId of nodeChildren) {
                yield put(removeNodeChildren(childId, nodes, activeNodes))
            }
        }
    }
    
}

function* watcher() {
    yield takeLatest('ON_CLICK_NODE', handleNodeClick);
    yield takeEvery('REMOVE_NODE_CHILDREN', handleRemoveNodeChildren)
    yield takeEvery('ADD_NODE_WITH_CHILDREN', handleAddNodeWithChildren)
}

export default function* rootSaga() {
    yield all([
        watcher()
    ])
}