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
            const res = await fetch(API, {headers: {Accept: "application/json"}});
            const data = await res.json();
            setItems(data.items);
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
        setItems((prev) => prev.filter((i) => i.id !== id));
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
                {items.map((item) => (
                    <StreetfoodsItem
                        key={item.id}
                        item={item}
                        onDelete={() => deleteItem(item.id)}
                    />
                ))}
            </div>
        </section>
    );
}

export default Home;
