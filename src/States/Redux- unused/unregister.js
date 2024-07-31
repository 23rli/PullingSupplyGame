import { useDispatch, useSelector } from "react-redux";
import { unregister } from "../../ReduxStore/authSlice";

function unregister(){
    const registered = useSelector((state) => state.auth.isRegistered)
    const dispatch = useDispatch();

    return(
        <div>
            {registered ? dispatch(unregister) : null}
        </div>
    );
}