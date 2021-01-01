import React from "react";
import { Link, useParams} from 'react-router-dom'
import axios from 'axios';

import {CircularProgress} from '@material-ui/core'
const BASEURL = 'http://localhost:3001/users/';

export default function Confirmation() {
    let { id } = useParams();
    const [confirming, setConfirming] = React.useState(true);

    const verify = async () => {
        try{
            await axios.post(BASEURL+"confirm/"+id);
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