import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

const API = "http://145.24.237.16:8001/streetfoods";

function StreetfoodDetail() {
    const {id} = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // ✅ Guard: geen id = niet fetchen
        if (!id) {
            setError("404 Not Found");
            setLoading(false);
            return;
        }

        async function loadDetail() {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${API}/${id}`, {
                    headers: {Accept: "application/json"},
                });

                if (!res.ok) {
                    throw new Error("404 Not Found");
                }

                const data = await res.json();

                // API kan { item: {...} } of direct {...} teruggeven
                setItem(data.item ?? data);
            } catch (e) {
                setError("404 Not Found");
            } finally {
                setLoading(false);
            }
        }

        loadDetail();
    }, [id]);

    if (loading) {
        return <p className="text-slate-600">Loading…</p>;
    }

    if (error) {
        return (
            <section className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="mb-4 text-red-600">{error}</p>
                <Link
                    to="/"
                    className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-white"
                >
                    Home
                </Link>
            </section>
        );
    }

    if (!item) {
        return null;
    }

    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        {item.name}
                    </h2>
                    <p className="mt-1 text-slate-600">
                        {item.city}, {item.country}
                    </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900">
          € {item.price}
        </span>
            </div>

            <div className="space-y-4 text-slate-700">
                <div>
                    <p className="text-sm font-semibold text-slate-900">Taste</p>
                    <p>{item.taste}</p>
                </div>

                <div>
                    <p className="text-sm font-semibold text-slate-900">Description</p>
                    <p>{item.description}</p>
                </div>
            </div>

            <div className="mt-8">
                <Link
                    to="/"
                    className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
                >
                    Home
                </Link>
            </div>
        </section>
    );
}

export default StreetfoodDetail;
