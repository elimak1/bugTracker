import React from "react";
import UserProfile from './UserProfile';
import { useSelector} from 'react-redux';

export default function UserPage() {
    const users = useSelector(state => state.users);
    const login = useSelector(state => state.login);

    let user;
    if (users && login) {
        user = users.find((us) => us.username === login.username);
    }

    if(user) {
      return(
          <UserProfile editmode={true} user={user}/>
      )
    } else {
        return(<div>Problem fetching user</div>)
    }
  }