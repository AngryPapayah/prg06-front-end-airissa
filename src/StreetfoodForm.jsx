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

    const [errors, setErrors] = useState({});

    function change(e) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));

        // als user typt: error voor dat veld weghalen
        setErrors((prev) => {
            const next = {...prev};
            delete next[name];
            return next;
        });
    }

    function validate(values) {
        const nextErrors = {};
        const required = ["name", "country", "city", "description", "taste", "price"];

        required.forEach((field) => {
            const v = values[field];
            if (typeof v !== "string" || v.trim() === "") {
                nextErrors[field] = "This field is required";
            }
        });

        return nextErrors;
    }

    async function submit(e) {
        e.preventDefault();

        const nextErrors = validate(form);
        setErrors(nextErrors);

        // als er errors zijn: niet submitten
        if (Object.keys(nextErrors).length > 0) return;

        await onSubmit({
            ...form,
            // als jij price als string wilt opslaan, laat dit weg
            price: Number(form.price),
        });
    }

    const fieldClass = (name) =>
        `w-full rounded-lg border p-2 ${errors[name] ? "border-red-500" : "border-slate-200"}`;

    return (
        <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
                {initialValues?.id || initialValues?._id ? "Streetfood edit" : "create streetfood"}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm text-slate-600">Dish name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={change}
                        className={fieldClass("name")}
                        required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm text-slate-600">Country</label>
                    <input
                        name="country"
                        value={form.country}
                        onChange={change}
                        className={fieldClass("country")}
                        required
                    />
                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm text-slate-600">City</label>
                    <input
                        name="city"
                        value={form.city}
                        onChange={change}
                        className={fieldClass("city")}
                        required
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm text-slate-600">Price (€)</label>
                    <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={change}
                        className={fieldClass("price")}
                        required
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>
            </div>

            <div className="mt-4">
                <label className="mb-1 block text-sm text-slate-600">Taste</label>
                <input
                    name="taste"
                    value={form.taste}
                    onChange={change}
                    className={fieldClass("taste")}
                    required
                />
                {errors.taste && <p className="mt-1 text-sm text-red-600">{errors.taste}</p>}
            </div>

            <div className="mt-4">
                <label className="mb-1 block text-sm text-slate-600">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={change}
                    className={fieldClass("description")}
                    rows={3}
                    required
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onCancel} className="rounded-lg bg-slate-200 px-4 py-2">
                    Cancel
                </button>
                <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white">
                    Save
                </button>
            </div>
        </form>
    );
}

export default StreetfoodForm;
