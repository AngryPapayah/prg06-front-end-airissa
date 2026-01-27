import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import StreetfoodsItem from "./StreetfoodsItem.jsx";

const API = "http://145.24.237.16:8001/streetfoods";

function Home() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //  filters
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState("all");

    async function loadItems() {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(API, {headers: {Accept: "application/json"}});
            const data = await res.json();
            setItems(Array.isArray(data.items) ? data.items : []);
        } catch {
            setError("Loading failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadItems();
    }, []);

    async function deleteItem(id) {
        if (!confirm("Are you sure to delete?")) return;
        await fetch(`${API}/${id}`, {method: "DELETE"});
        setItems((prev) => prev.filter((i) => (i.id ?? i._id) !== id));
    }

    // landen lijst voor dropdown
    const countries = useMemo(() => {
        const set = new Set();
        items.forEach((i) => {
            const c = String(i.country ?? "").trim();
            if (c) set.add(c);
        });
        return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
    }, [items]);

    // filteren van items
    const filteredItems = useMemo(() => {
        const q = search.trim().toLowerCase();

        return items.filter((i) => {
            const matchesCountry =
                country === "all" ||
                String(i.country ?? "").trim().toLowerCase() === country.toLowerCase();

            if (!matchesCountry) return false;

            if (!q) return true;

            const haystack = [
                i.name,
                i.country,
                i.city,
                i.taste,
            ]
                .map((v) => String(v ?? "").toLowerCase())
                .join(" ");

            return haystack.includes(q);
        });
    }, [items, search, country]);

    return (
        <section>
            <div className="home__header">
                <h2 className="page-title">Streetfoods</h2>

                <Link to="/create" className="btn btn--primary">
                    + New streetfood
                </Link>
            </div>

            {/*  FILTERS */}
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm text-slate-600">
                        Search
                    </label>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, city, country, taste…"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm text-slate-600">
                        Filter by Country
                    </label>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
                    >
                        {countries.map((c) => (
                            <option key={c} value={c}>
                                {c === "all" ? "All County" : c}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* status */}
            {loading && <p className="state">Loading…</p>}
            {error && <p className="state state--error">{error}</p>}

            {/* ✅ Result count */}
            {!loading && !error && (
                <p className="mb-4 text-sm text-slate-600">
                    Resultaten: <span className="font-semibold">{filteredItems.length}</span>
                    {filteredItems.length !== items.length && (
                        <> (van {items.length})</>
                    )}
                </p>
            )}

            <div className="grid">
                {filteredItems.map((item) => {
                    const id = item.id ?? item._id;
                    return (
                        <StreetfoodsItem
                            key={id}
                            item={item}
                            onDelete={() => deleteItem(id)}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default Home;
