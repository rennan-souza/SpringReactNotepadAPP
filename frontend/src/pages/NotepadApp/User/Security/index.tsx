import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { requestBackend } from "../../../../util/requests";

type UserPassForm = {
    password: string;
    new_password: string;
    new_password_confirmation: string;
};

const Security = () => {

    const [load, setLoad] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<UserPassForm>();

    const onSubmit = (userPassForm: UserPassForm) => {
        setLoad(true);
        requestBackend({
            method: "PUT",
            url: "/profile/pass",
            data: {
                password: userPassForm.password,
                newPassword: userPassForm.new_password,
            },
            withCredentials: true,
        })
            .then(() => {
                toast.success(
                    "Senha alterada com sucesso",
                    {
                        position: "bottom-right",
                        autoClose: 5000,
                    }
                );
                setLoad(false);
                reset();
            })
            .catch((error) => {
                reset();
                setLoad(false);
                toast.error(error.response.data.error_description, {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            });
    };

    return (
        <div className="container">
            <div className="mb-4">
                <h1><i className="fas fa-user-lock mr-2"></i>Minha senha</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input
                        {...register("password", {
                            required: "Campo obrigatório",
                        })}
                        type="password"
                        className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""
                            }`}
                        placeholder="Senha atual"
                        name="password"
                    />
                    <small className="text-danger">{errors.password?.message}</small>
                </div>

                <div className="form-group">
                    <input
                        {...register("new_password", {
                            required: "Campo obrigatório",
                            minLength: {
                                value: 6,
                                message: "A senha deve conter no mínimo 6 caracteres",
                            },
                        })}
                        type="password"
                        className={`form-control form-control-lg ${errors.new_password ? "is-invalid" : ""
                            }`}
                        placeholder="Nova senha"
                        name="new_password"
                    />
                    <small className="text-danger">
                        {errors.new_password?.message}
                    </small>
                </div>

                <div className="form-group">
                    <input
                        {...register("new_password_confirmation", {
                            required: "Campo obrigatório",
                            validate: (value) =>
                                value === watch("new_password") ||
                                "A confirmação da senha não coincide",
                        })}
                        type="password"
                        className={`form-control form-control-lg ${errors.new_password_confirmation ? "is-invalid" : ""
                            }`}
                        placeholder="Confirme a nova senha"
                        name="new_password_confirmation"
                    />
                    <small className="text-danger">
                        {errors.new_password_confirmation?.message}
                    </small>
                </div>

                <div className="mb-4">
                    {load ? (
                        <button className="btn btn-lg btn-success base-btn" disabled>
                            <div className="spinner-border" role="status"></div>
                        </button>
                    ) : (
                        <button className="btn btn-lg btn-success base-btn">
                            Salvar
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Security;