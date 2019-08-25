import React from 'react'

import { List } from 'semantic-ui-react'

const User = ({ user }) => (
  <div>
    {user &&
      <div>
        <h2>{ user.name }</h2>
        <h3>added blogs</h3>
        <List divided>
          {user.blogs.map(b => <List.Item key={b.id}>{b.title}</List.Item>)}
        </List>
      </div>
    }
  </div>
)

export default User