import React from 'react'
import { connect } from 'react-redux'

import { Message } from 'semantic-ui-react'

const Notification = (props) => {

  if(props.message === null){
    return null
  }

  if(props.isError) {
    return (
      <Message negative>
        {props.message}
      </Message>
    )
  }

  return(
    <Message positive>
      {props.message}
    </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    isError: state.notification.isError
  }
}

export default connect(mapStateToProps)(Notification)