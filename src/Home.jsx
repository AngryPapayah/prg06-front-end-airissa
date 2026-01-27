import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import StreetfoodsItem from "./StreetfoodsItem.jsx";

const API = "http://145.24.237.16:8001/streetfoods";

function Home() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadItems() {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(API, {headers: {Accept: "application/json"}});
            const data = await res.json();
            setItems(Array.isArray(data.items) ? data.items : []);
        } catch {
            setError("Laden mislukt");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadItems();
    }, []);

    async function deleteItem(id) {
        if (!confirm("Weet je het zeker?")) return;

        await fetch(`${API}/${id}`, {method: "DELETE"});
        setItems((prev) => prev.filter((i) => (i.id ?? i._id) !== id));
    }

    return (
        <section>
            <div className="home__header">
                <h2 className="page-title">Streetfoods</h2>

                <Link to="/create" className="btn btn--primary">
                    + Nieuw streetfood
                </Link>
            </div>

            {loading && <p className="state">Laden…</p>}
            {error && <p className="state state--error">{error}</p>}

            <div className="grid">
                {items.map((item) => {
                    const id = item.id ?? item._id; // ✅ FIX
                    return (
                        <StreetfoodsItem
                            key={id}
                            item={item}
                            id={id}
                            onDelete={() => deleteItem(id)}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default Home;
