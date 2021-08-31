import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { requestBackend } from "../../../util/requests";

type formData = {
    password: string;
    password_confirmation: string;
}

type UrlParams = {
    token: string;
};

const Reset = () => {

    const history = useHistory();

    const { token } = useParams<UrlParams>();

    const [load, setLoad] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<formData>();

    const onSubmit = (data: formData) => {
        setLoad(true)
        requestBackend({
            method: 'POST',
            url: '/users/reset',
            data: {
                password: data.password,
                token
            },
            withCredentials: false,
        }).then(() => {
            toast.success('Senha alterada com sucesso', {
                position: "bottom-left",
                autoClose: 5000,
            });
            setLoad(false);
            reset();
            history.push('/auth/signin');
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: "bottom-left",
                autoClose: 5000,
            });
            setLoad(false);
        })
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-title">
                    <h1>Esqueci minha senha</h1>
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
                        placeholder="Nova senha"
                        name="password"
                    />
                    <small className="text-danger">
                        {errors.password?.message}
                    </small>
                </div>

                <div className="form-group">
                    <input
                        {...register("password_confirmation", {
                            required: "Campo obrigatório",
                            validate: (value) =>
                                value === watch("password") ||
                                "A confirmação da senha não coincide",
                        })}
                        type="password"
                        className={`form-control form-control-lg ${errors.password_confirmation ? "is-invalid" : ""
                            }`}
                        placeholder="Confirme a nova senha"
                        name="password_confirmation"
                    />
                    <small className="text-danger">
                        {errors.password_confirmation?.message}
                    </small>
                </div>

                <div className="form-group">
                    {load ? (
                        <button className="btn btn-lg btn-outline-primary btn-block" disabled>
                            <div className="spinner-border" role="status"></div>
                        </button>
                    ) : (
                        <button className="btn btn-lg btn-primary btn-block">
                            Salvar
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
};

export default Reset;