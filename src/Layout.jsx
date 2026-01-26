import {Link, Outlet} from "react-router-dom";

function Layout() {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-10">
                {/* Header */}
                <header className="mb-12 text-center">
                    <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900">
                        Streetfoods
                    </h1>

                    <p className="text-slate-600">
                        Ontdek streetfood van over de hele wereld
                    </p>

                    {/* Navigatie */}
                    <nav className="mt-6 flex justify-center gap-4">
                        <Link
                            to="/"
                            className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
                        >
                            Home
                        </Link>

                        <Link
                            to="/create"
                            className="rounded-lg bg-slate-200 px-4 py-2 text-slate-900 transition hover:bg-slate-300"
                        >
                            Nieuw streetfood
                        </Link>

                        <Link
                            to="/about"
                            className="rounded-lg bg-slate-200 px-4 py-2 text-slate-900 transition hover:bg-slate-300"
                        >
                            About
                        </Link>
                    </nav>
                </header>

                {/* Hier wisselen de pagina's */}
                <Outlet/>
            </div>
        </main>
    );
}

export default Layout;
