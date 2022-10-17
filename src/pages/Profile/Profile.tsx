import useAuth from '../../hooks/userAuth';
import { postApi } from '../../services/PostService';
import s from '../../styles/styleComponents/Profile.module.scss';

export default function Profile() {
    const { data = [], isLoading } = postApi.useFetchAllUsersQuery(null)
    const {userName} = useAuth()
    return (
        <div className={s.profile}>
            <div className={s.profile__body}>
                <div className={s.profile__title}>
                    <h1>Ваш профиль</h1>
                </div>
                <div className={s.profile__info}>
                    <div className={s.profile__main_info}>
                        <div className={s.profile__img}>
                        </div>
                        <div className={s.profile__name}>
                            <h1>{userName}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}