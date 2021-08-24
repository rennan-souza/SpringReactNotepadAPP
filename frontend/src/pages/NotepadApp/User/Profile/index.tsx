import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../AuthContext";
import { getTokenData, requestBackend, requestBackendLogin, saveAuthData } from "../../../../util/requests";


type UserProfileForm = {
    name: string;
    email: string;
    password: string;
};

const Profile = () => {

    const { setAuthContextData } = useContext(AuthContext);
    const [load, setLoad] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserProfileForm>();

    const setFormData = useCallback(() => {
        requestBackend({
            method: "GET",
            url: "/profile",
            withCredentials: true,
        }).then((response) => {
            const data = response.data as UserProfileForm;
            setValue("name", data.name);
            setValue("email", data.email);
            setValue("password", "");
        });
    }, [setValue]);


    useEffect(() => {
        setFormData();
    }, [setFormData]);

    const onSubmit = (userProfileForm: UserProfileForm) => {
        setLoad(true);
        requestBackend({
            method: "PUT",
            url: "/profile",
            data: userProfileForm,
            withCredentials: true,
        })
            .then(() => {
                const reauthenticateUserData = {
                    username: userProfileForm.email,
                    password: userProfileForm.password
                }

                requestBackendLogin(reauthenticateUserData)
                    .then((response) => {
                        saveAuthData(response.data);
                        setAuthContextData({
                            autheticated: true,
                            tokenData: getTokenData(),
                        });
                        toast.success(
                            "Dados atualizados com sucesso",
                            {
                                position: "bottom-right",
                                autoClose: 5000,
                            }
                        );
                        setFormData();
                        setLoad(false);
                    })

            })
            .catch((error) => {
                toast.error(
                    error.response.data.error_description || error.response.data.message,
                    {
                        position: "bottom-right",
                        autoClose: 5000,
                    }
                );
                setFormData();
                setLoad(false);
            });
    };

    return (
        <div className="container">
            <div className="mb-4">
                <h1><i className="fas fa-user-cog mr-2"></i>Meus dados</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input
                        {...register("name", {
                            required: "Campo obrigatório",
                        })}
                        type="text"
                        className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""
                            }`}
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
                        name="email"
                    />
                    <small className="text-danger">{errors.email?.message}</small>
                </div>
                <div className="form-group">
                    <input
                        {...register("password", {
                            required: "Campo obrigatório",
                        })}
                        type="password"
                        className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""
                            }`}
                        placeholder="Para salvar insira sua senha"
                        name="password"
                    />
                    <small className="text-danger">{errors.password?.message}</small>
                </div>
                <div className="form-group">
                    {load ? (
                        <button className="btn btn-lg btn-success" disabled>
                            <div className="spinner-border" role="status"></div>
                        </button>
                    ) : (
                        <button className="btn btn-lg btn-success">
                            Salvar
                        </button>
                    )}
                </div>
            </form>
        </div >
    )
}

export default Profile;