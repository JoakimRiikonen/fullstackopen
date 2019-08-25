import React, { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'

const Users = ({ users, initializeUsers }) => {

  const initUsers = initializeUsers
  useEffect(() => {
    initUsers()
  }, [])

  if(users === undefined) {
    return(<div></div>)
  }

  return(<div>
    <h2>Users</h2>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>blogs created</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map(user => (
          <Table.Row key={user.id}>
            <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
            <Table.Cell>{user.blogs.length}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>)
}

const mapStateToProps = (state) => {
  return{
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)