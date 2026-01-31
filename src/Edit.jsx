import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import StreetfoodForm from "./StreetfoodForm.jsx";

const API = "http://145.24.237.16:8001/streetfoods";

function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //  Huidige item ophalen om form vooraf te vullen
    useEffect(() => {
        if (!id) {
            setError("No ID in the url");
            setLoading(false);
            return;
        }

        async function loadItem() {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${API}/${id}`, {
                    headers: {Accept: "application/json"},
                });

                if (res.status === 404) {
                    setError("Item not found");
                    setItem(null);
                    return;
                }

                if (!res.ok) {
                    const msg = await res.text().catch(() => "");
                    setError(msg || `Failed to load item. (${res.status})`);
                    setItem(null);
                    return;
                }

                const data = await res.json();
                setItem(data.item ?? data);
            } catch {
                setError("Network error: unable to reach server.");
                setItem(null);
            } finally {
                setLoading(false);
            }
        }

        loadItem();
    }, [id]);

    // Update (PUT) + check of het echt gelukt is
    async function updateItem(payload) {
        try {
            setError("");

            const res = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (res.status === 404) {
                setError("Update failed: item not found.");
                return;
            }

            if (!res.ok) {
                // backend stuurt vaak een message terug als tekst of json
                const text = await res.text().catch(() => "");
                setError(text || `Update failed. (${res.status})`);
                return;
            }

            // optioneel: als backend updated item terugstuurt, lezen (maakt niet kapot als het niet zo is)
            await res.json().catch(() => null);

            // naar detailpagina (detail haalt opnieuw data op)
            navigate(`/streetfoods/${id}`);
        } catch {
            setError("Network error while updating the item.");
        }
    }

    if (loading) return <p>Loading…</p>;

    if (error) {
        return (
            <section className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">Error</h2>
                <p className="mb-4 text-slate-700">{error}</p>
                <button
                    className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-white"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </section>
        );
    }

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
