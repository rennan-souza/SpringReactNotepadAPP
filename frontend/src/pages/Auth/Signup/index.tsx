import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { requestBackend } from "../../../util/requests";
import { toast } from "react-toastify";


type UserSignupFormData = {
    name: string;
    email: string;
    password: string;
};

const Signup = () => {

    const history = useHistory();

    const [load, setLoad] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSignupFormData>();

    const onSubmit = (userSignupFormData: UserSignupFormData) => {
        setLoad(true);
        const config: AxiosRequestConfig = {
            method: "POST",
            url: "/users/signup",
            withCredentials: false,
            data: userSignupFormData,
        };

        requestBackend(config)
            .then((response) => {
                toast.success("Conta criada com sucesso", {
                    position: "bottom-left",
                    autoClose: 5000,
                });
                history.push("/auth/signin");
            })
            .catch((error) => {
                setLoad(false);
                toast.error(error.response.data.errors[0].message, {
                    position: "bottom-left",
                    autoClose: 5000,
                });
            });
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-title">
                    <h1>Criar conta</h1>
                </div>
                <div className="form-group">
                    <input
                        {...register("name", {
                            required: "Campo obrigatório",
                        })}
                        type="text"
                        className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""
                            }`}
                        placeholder="Nome completo"
                        name="name"
                    />
                    <small className="text-danger">{errors.name?.message}</small>
                </div>
                <div className="form-group">
                    <input
                        {...register("email", {
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido",
                            },
                        })}
                        type="text"
                        className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""
                            }`}
                        placeholder="Email"
                        name="email"
                    />
                    <small className="text-danger">{errors.email?.message}</small>
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
                    {load ? (
                        <button className="btn btn-lg btn-primary btn-block" disabled>
                            <div className="spinner-border" role="status"></div>
                        </button>
                    ) : (
                        <button className="btn btn-lg btn-primary btn-block">
                            CRIAR CONTA
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Signup;