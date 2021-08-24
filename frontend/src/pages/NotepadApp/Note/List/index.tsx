import { getAuthData, getTokenData } from "../../../../util/requests";

const List = () => {
    return (
        <div className="container">
            <p>Notes list</p>
            <p>Name logged: { getAuthData().userFullName}</p>
            <p>Email logged: { getTokenData()?.user_name}</p>
        </div>
    )
}

export default List;