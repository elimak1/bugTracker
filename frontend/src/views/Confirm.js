import React from "react";
import { useDispatch} from 'react-redux';
import { Link, useParams} from 'react-router-dom'
import axios from 'axios';
import {customNotification} from '../reducers/notificationReducer';

import {CircularProgress} from '@material-ui/core'
const BASEURL = 'https://elimaksbugtracker.herokuapp.com/api/users/';

export default function Confirmation() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [confirming, setConfirming] = React.useState(true);

    const verify = async () => {
        try{
            await axios.post(BASEURL+"confirm/"+id);
            dispatch(customNotification("Account verified!", "success"))
            setConfirming(false);
        } catch (e) {
            console.log(e);
        }
    }
    
    React.useEffect( () => {
        verify();
    }, []);


    return (
      <div>
          {confirming?<CircularProgress />:
          <Link to='/login'>
              Email verified, click here to return
        </Link>}
          
      </div>
      
    );
  }