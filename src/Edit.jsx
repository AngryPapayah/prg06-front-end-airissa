import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import StreetfoodForm from "./StreetfoodForm.jsx";

const API = "http://145.24.237.16:8001/streetfoods";

function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadItem() {
            const res = await fetch(`${API}/${id}`, {
                headers: {Accept: "application/json"},
            });
            const data = await res.json();
            setItem(data.item ?? data);
            setLoading(false);
        }

        loadItem();
    }, [id]);

    async function updateItem(payload) {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        navigate(`/streetfoods/${id}`);
    }

    if (loading) return <p>Loading…</p>;
    if (!item) return <p>Item not found</p>;

    return (
        <>
            <h2 className="page-title">Streetfood Edit</h2>

            <StreetfoodForm
                initialValues={item}
                onSubmit={updateItem}
                onCancel={() => navigate(-1)}
            />
        </>
    );
}

export default Edit;
