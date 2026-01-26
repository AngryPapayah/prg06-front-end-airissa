import {Link} from "react-router-dom";

function About() {
    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold text-slate-900">About</h2>

            <p className="text-slate-700">
                Dit is een single page webapplicatie voor mijn Streetfoods RESTful webservice (PRG06).
                Je kunt items bekijken, toevoegen, aanpassen en verwijderen.
            </p>

            <div className="mt-6">
                <Link
                    to="/"
                    className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
                >
                    Terug naar Home
                </Link>
            </div>
        </section>
    );
}

export default About;
