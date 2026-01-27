import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

const API = "http://145.24.237.16:8001/streetfoods";

function StreetfoodDetail() {
    const {id} = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const [errorCode, setErrorCode] = useState(null); // 404 / 500 / "network"
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!id) {
            setErrorCode(404);
            setErrorMsg("Page does not excist.");
            setLoading(false);
            return;
        }

        async function loadDetail() {
            try {
                setLoading(true);
                setErrorCode(null);
                setErrorMsg("");

                const res = await fetch(`${API}/${id}`, {
                    headers: {Accept: "application/json"},
                });

                if (res.status === 404) {
                    setErrorCode(404);
                    setErrorMsg("Streetfood not found.");
                    setItem(null);
                    return;
                }

                if (!res.ok) {
                    setErrorCode(res.status);
                    setErrorMsg("Something went wrong getting the details.");
                    setItem(null);
                    return;
                }

                const data = await res.json();
                setItem(data.item ?? data);
            } catch {
                setErrorCode("network");
                setErrorMsg("Network error: Unable to reach server..");
                setItem(null);
            } finally {
                setLoading(false);
            }
        }

        loadDetail();
    }, [id]);

    if (loading) return <p className="text-slate-600">Loading…</p>;

    if (errorCode) {
        return (
            <section className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                    {errorCode === 404 ? "404 Not Found" : "Error"}
                </h2>
                <p className="mb-4 text-slate-700">{errorMsg}</p>

                <Link
                    to="/"
                    className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-white"
                >
                    Home
                </Link>
            </section>
        );
    }

    if (!item) return null;

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
