import {Link} from "react-router-dom";

function NotFound() {
    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold text-slate-900">404 Not Found</h2>
            <p className="mb-4 text-slate-700">
                page does not excist.
            </p>
            <Link
                to="/"
                className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-white"
            >
                Home
            </Link>
        </section>
    );
}

export default NotFound;
