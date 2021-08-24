import { getAuthData, getTokenData } from "../../../../util/requests";

const List = () => {
    return (
        <div className="container">
            <h1>Notes list</h1>
            <h1>Name logged: { getAuthData().userFullName}</h1>
            <h1>Email logged: { getTokenData()?.user_name}</h1>
        </div>
    )
}

export default List;