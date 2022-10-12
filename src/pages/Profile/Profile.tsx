import React, {useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/userAuth';
import s from '../../styles/styleComponents/Profile.module.scss';

export default function Profile() {
    const { isAuth, name } = useAuth()

    useEffect(() => {
        
    }, [isAuth])


    return (
        isAuth ?
            <div className={s.profile}>
                <div className={s.profile__body}>
                    <div className={s.profile__name}><h1>{name}</h1></div>
                </div>
            </div>
            :
            <Navigate to='/' />
    )
}