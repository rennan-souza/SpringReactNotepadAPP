import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { getTokenData, requestBackendLogin, saveAuthData } from "../../../util/requests";
import { toast } from "react-toastify";
import { AuthContext } from "../../../AuthContext";

type UserFormLogin = {
    username: string;
    password: string;
};

const Signin = () => {

    const history = useHistory();
    const { setAuthContextData } = useContext(AuthContext);
    const [load, setLoad] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormLogin>();

    const onSubmit = (userFormLogin: UserFormLogin) => {
        setLoad(true);
        requestBackendLogin(userFormLogin)
            .then((response) => {
                saveAuthData(response.data);
                setAuthContextData({
                    autheticated: true,
                    tokenData: getTokenData(),
                });
                history.push("/notes");
            })
            .catch(() => {
                toast.error("Email e ou senha inválidos", {
                    position: "bottom-left",
                    autoClose: 5000,
                });
                setLoad(false);
            });
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-title">
                    <h1>Login</h1>
                </div>
                <div className="form-group">
                    <input
                        {...register("username", {
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido",
                            },
                        })}
                        type="text"
                        className={`form-control form-control-lg ${errors.username ? "is-invalid" : ""
                            }`}
                        placeholder="Email"
                        name="username"
                    />
                    <small className="text-danger">{errors.username?.message}</small>
                </div>
                <div className="form-group">
                    <input
                        {...register("password", {
                            required: "Campo obrigatório",
                            minLength: {
                                value: 6,
                                message: "A senha deve conter no mínimo 6 caracteres",
                            },
                        })}
                        type="password"
                        className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""
                            }`}
                        placeholder="Senha"
                        name="password"
                    />
                    <small className="text-danger">{errors.password?.message}</small>
                </div>

                <div className="form-group">
                    <Link to="/auth/recover" className="text-dark">
                        <small>Esqueci minha senha</small>
                    </Link>
                </div>

                <div className="form-group">
                    {load ? (
                        <button className="btn btn-lg btn-outline-primary btn-block" disabled>
                            <div className="spinner-border" role="status"></div>
                        </button>
                    ) : (
                        <button className="btn btn-lg btn-outline-primary btn-block">
                            LOGIN
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
};

export default Signin;