import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { requestBackend } from "../../../../util/requests";
import SweetAlert from "react-bootstrap-sweetalert";

type UrlParams = {
  noteId: string;
};

type Note = {
  title: string;
  content: string;
};


const Create = () => {

  const { noteId } = useParams<UrlParams>();
  const isEditing = noteId !== 'create';
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Note>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({
        url: `/notes/${noteId}`,
        withCredentials: true
      }).then((response) => {
        const note = response.data as Note;
        setValue('title', note.title);
        setValue('content', note.content);
      });
    }
  }, [noteId, setValue, isEditing])

  const onSubmit = (note: Note) => {
    setLoad(true);
    requestBackend({
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/notes/${noteId}` : `/notes`,
      data: note,
      withCredentials: true,
    }).then(() => {
      toast.success("Nota salva com sucesso", {
        position: "bottom-right",
        autoClose: 5000,
      });
      setLoad(false);
      history.push("/notes")
    }).catch((error) => {
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
      });
      setLoad(false);
    })
  }

  const handleDeleteNote = (noteId: string) => {
    requestBackend({
      method: "DELETE",
      url: `/notes/${noteId}`,
      withCredentials: true
    }).then(() => {
      history.push("/notes")
      toast.success("Nota excluída com sucesso", {
        position: "bottom-right",
        autoClose: 5000,
      });
    });
    
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <h1><i className="fas fa-pencil-alt mr-2"></i>Minha nota</h1>
        </div>
        <div className="form-group">
          <input
            {...register("title", {
              required: "Campo obrigatório",
            })}
            type="text"
            className={`form-control form-control-lg ${errors.title ? "is-invalid" : ""
              }`}
            placeholder="Título"
            name="title"
          />
          <small className="text-danger">{errors.title?.message}</small>
        </div>
        <div className="form-group">
          <textarea
            {...register("content", {
              required: "Campo obrigatório",
            })}
            className={`form-control form-control-lg ${errors.content ? "is-invalid" : ""
              }`}
            rows={8}
            placeholder="Conteúdo da sua anotação"
          ></textarea>
          <small className="text-danger">{errors.content?.message}</small>
        </div>

        <div className="mb-4">
          {load ? (
            <button className="btn btn-lg btn-success" disabled>
              <div className="spinner-border" role="status"></div>
            </button>
          ) : (
            <>
              <button className="btn btn-lg btn-success mr-2">
                Salvar
              </button>
              {isEditing ? (
                <button type="button" className="btn btn-lg btn-outline-danger" onClick={() => setAlertDelete(true)}>
                  Excluir
                </button>
              ) : ""}
            </>
          )}
        </div>
      </form>

      {alertDelete ? (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Sim"
          confirmBtnBsStyle="danger"
          cancelBtnText="Não"
          cancelBtnBsStyle="light"
          title="Excluir?"
          onConfirm={() => handleDeleteNote(noteId) }
          onCancel={() => setAlertDelete(false)}
          reverseButtons={true}
        >
          Tem certeza que deseja exluir?
        </SweetAlert>
      ) : ""}


    </div>
  )
}

export default Create;
