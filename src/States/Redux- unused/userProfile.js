import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.auth.user)
    return(
        <div>
            {user ? <>{user}</> : null}
        </div>
    )
}

export default Profile;