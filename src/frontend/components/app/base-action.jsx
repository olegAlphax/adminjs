import React from 'react'
import PropTypes from 'prop-types'

import { resourceType, actionType, recordType } from '../../types'
import WrapperBox from '../ui/wrapper-box'

import actions from '../actions'

/**
 * @classdesc
 * Component which renders all the default and custom actions for both the Resource and the Record.
 *
 * It passes all props down to the actual Action component.
 *
 * Example of creating your own actions:
 * ```
 * // AdminBro options
 * const AdminBroOptions = {
 *   resources: [
 *      resource,
 *      options: {
 *        actions: {
 *           myNewAction: {
 *             label: 'amazing action',
 *             icon: 'fas fa-eye',
 *             inVisible: (resource, record) => record.param('email') !== '',
 *             actionType: 'record',
 *             component: AdminBro.require('./my-new-action'),
 *             handler: (request, response, data) => {
 *               return {
 *                  ...
 *               }
 *             }
 *           }
 *        }
 *      }
 *   ]
 * }
 * ```
 *
 * ```
 * // ./my-new-action.jsx
 * import WrapperBox from 'admin-bro/components'
 *
 * const MyNewAction = (props) => {
 *   const { resource, action, record } = props
 *   // do something with the props and render action
 *   return (
 *     <WrapperBox>Some Action Content</WrapperBox>
 *   )
 * }
 * ```
 *
 * @component
 * @hideconstructor
 * @category Base
 */
class BaseActionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  componentDidMount() {
    this.setState({ isClient: true })
  }

  render() {
    const { resource, action, record } = this.props

    const { isClient } = this.state

    let Action = actions[action.name]
    if (isClient && action.component) {
      Action = AdminBro.UserComponents[action.component]
    }
    if (Action) {
      return (
        <Action
          action={action}
          resource={resource}
          record={record}
        />
      )
    }
    return Action || (
      <WrapperBox>
        You have to implement action component for your Action.
      </WrapperBox>
    )
  }
}

BaseActionComponent.propTypes = {
  /**
   * Object of type: {@link BaseResource~JSON}
   */
  resource: resourceType.isRequired,
  /**
   * Object of type: {@link Action~JSON}
   */
  action: actionType.isRequired,
  /**
   * Object of type: {@link BaseRecord~JSON}
   */
  record: recordType,
}

BaseActionComponent.defaultProps = {
  record: null,
}

export default BaseActionComponent
