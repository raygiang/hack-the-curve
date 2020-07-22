import React from 'react';
import {useHistory} from 'react-router-dom';
import './profile-page.scss';
import auth from '../../../utils/auth';
import UpdateForm from '../../Profile/UpdateForm/UpdateForm';

const ProfilePage = () => {
    const history = useHistory();

    if(!auth.getToken()) history.push("/login");
    
    const user = auth.getUserInfo();

    if(!user) {
        return(
            <div>Loading...</div>
        )
    }

    return (
        <main className="profile-page">
            <h1 className="profile-page__heading">Welcome, {user.first_name + ' ' + user.last_name}!</h1>
            <p className="profile-page__description">Below is your profile page.</p>
            <UpdateForm user={user} />
        </main>
    )
}

export default ProfilePage
