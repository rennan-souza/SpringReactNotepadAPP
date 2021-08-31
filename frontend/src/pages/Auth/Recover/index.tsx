import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { requestBackend } from "../../../util/requests";

type UserFormRecover = {
    email: string;
}

const Recover = () => {


    const [load, setLoad] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserFormRecover>();

    const onSubmit = (userFormRecover: UserFormRecover) => {
        setLoad(true)
        requestBackend({
            method: 'POST',
            url: '/users/recover',
            data: userFormRecover,
            withCredentials: false,
        }).then(() => {
            toast.success('Enviamos no seu o email o link para criar uma nova senha', {
                position: "bottom-left",
                autoClose: 5000,
            });
            setLoad(false);
            reset();
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
                    {load ? (
                        <button className="btn btn-lg btn-outline-primary btn-block" disabled>
                            <div className="spinner-border" role="status"></div>
                        </button>
                    ) : (
                        <button className="btn btn-lg btn-primary btn-block">
                            Enviar
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
};

export default Recover;