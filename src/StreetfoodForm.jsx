import {useState} from "react";

function StreetfoodForm({initialValues = {}, onSubmit, onCancel}) {
    const [form, setForm] = useState({
        name: initialValues.name || "",
        country: initialValues.country || "",
        city: initialValues.city || "",
        description: initialValues.description || "",
        taste: initialValues.taste || "",
        price: initialValues.price || "",
    });

    function change(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    function submit(e) {
        e.preventDefault();
        onSubmit({...form, price: Number(form.price)});
    }

    return (
        <form onSubmit={submit} className="form">
            <h2 className="form__title">
                {initialValues.name ? "Streetfood bewerken" : "Nieuw streetfood"}
            </h2>

            <div className="form__grid">
                <div className="form__field">
                    <label>Naam</label>
                    <input name="name" value={form.name} onChange={change}/>
                </div>

                <div className="form__field">
                    <label>Land</label>
                    <input name="country" value={form.country} onChange={change}/>
                </div>

                <div className="form__field">
                    <label>Stad</label>
                    <input name="city" value={form.city} onChange={change}/>
                </div>

                <div className="form__field">
                    <label>Prijs (€)</label>
                    <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={change}
                    />
                </div>
            </div>

            <div className="form__field">
                <label>Smaak</label>
                <input name="taste" value={form.taste} onChange={change}/>
            </div>

            <div className="form__field">
                <label>Beschrijving</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={change}
                    rows="3"
                />
            </div>

            <div className="form__actions">
                <button type="button" className="btn" onClick={onCancel}>
                    Annuleren
                </button>
                <button type="submit" className="btn btn--primary">
                    Opslaan
                </button>
            </div>
        </form>
    );
}

export default StreetfoodForm;
