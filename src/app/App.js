import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import * as reduxTreeActions from './redux/actions'
import Api from './api'

class App extends React.Component {

    componentWillMount() {
        // Get root id and root children
        Api.getRootId()
            .then(data => data['root'])
            .then(rootId => {
                this.props.actions.setRootNode(rootId)
                this.props.actions.addNodeWithChildren(rootId, this.props.nodes)
            })
    }

    // recursively render node and its children
    renderNodeChildren({ id, children }) {
        return (
            <ul>
                {children && children.map(childId => {
                    if(!this.props.activeNodes.hasOwnProperty(childId)) return null
                    
                    const node = this.props.nodes[childId]
                    const nodeChildren = node && node['children']                    

                    return (
                        <li key={childId}>
                            <span 
                                className={nodeChildren && nodeChildren.length > 0 && 'folder'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.props.actions.onClickNode(childId, this.props.nodes, this.props.activeNodes)
                                }}>
                                {childId}                                
                            </span>
                            {node && nodeChildren.length > 0 && this.props.nodes[nodeChildren[0]] && this.renderNodeChildren({ ...node })}
                        </li>
                    )
                })}
            </ul>
        )
    }

    render() {        
        // prevent render - if no root 
        if(!this.props.nodes[this.props.rootId]) return null
        return (
            <div>
                <div className="rootFolder">{this.props.rootId}</div>
                {this.renderNodeChildren({ ...this.props.nodes[this.props.rootId] })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { rootId, nodes, activeNodes } = state
    return {
        rootId,
        nodes,
        activeNodes,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...reduxTreeActions
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
