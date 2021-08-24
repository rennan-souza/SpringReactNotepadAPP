import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAuthData, getTokenData, requestBackend } from "../../../../util/requests";

type Note = {
    id: number;
    title: string;
    content: string;
};

const List = () => {

    const [notes, setNotes] = useState<Note[]>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: "/notes",
            withCredentials: true,
        };

        requestBackend(params).then((response) => {
            setNotes(response.data);
        });
    }, []);

    return (
        <div className="container">
            <a href="#link" className="btn btn-success mb-4">
                <i className="fas fa-plus mr-2"></i>
                <strong>NOVA NOTA</strong>
            </a>

            {notes?.map((note) => (
                <div className="border-bottom mb-4">
                    <a href="#link" className="text-dark">
                        <h3>{note.title}</h3>
                    </a>
                    <p className="my-1">
                        {note.content.length < 100
                            ? note.content
                            : note.content.substring(0, 100) + "..."}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default List;