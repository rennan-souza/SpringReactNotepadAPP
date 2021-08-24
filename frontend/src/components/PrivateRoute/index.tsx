import { Redirect, Route } from 'react-router-dom';
import { Role } from '../../util/requests';
import { hasAnyRoles, isAuthenticated } from '../../util/requests';

type Props = {
    children: React.ReactNode;
    path: string;
    roles?: Role[];
};

const PrivateRoute = ({ children, path, roles = [] }: Props) => {
    return (
        <Route
            path={path}
            render={({ location }) =>
                !isAuthenticated() ? (
                    <Redirect
                        to={{
                            pathname: '/auth/signin',
                            state: { from: location },
                        }}
                    />
                ) : !hasAnyRoles(roles) ? (
                    <Redirect to="/notes" />
                ) : (
                    children
                )
            }
        />
    );
};

export default PrivateRoute;