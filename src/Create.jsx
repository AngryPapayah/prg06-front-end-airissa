import {useNavigate} from "react-router-dom";
import StreetfoodForm from "./StreetfoodForm.jsx";

const API = "http://145.24.237.16:8001/streetfoods";

function Create() {
    const navigate = useNavigate();

    async function createItem(payload) {
        const res = await fetch(API, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const msg = await res.text().catch(() => "");
            alert(msg || "Aanmaken mislukt");
            return;
        }

        // optioneel: created item lezen
        await res.json().catch(() => null);

        // terug naar home (home doet opnieuw GET)
        navigate("/");
    }

    return (
        <>
            <h2 className="page-title">Nieuw streetfood</h2>
            <StreetfoodForm
                onSubmit={createItem}
                onCancel={() => navigate("/")}
            />
        </>
    );
}

export default Create;
