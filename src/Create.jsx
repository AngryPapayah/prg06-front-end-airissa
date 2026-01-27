import {useNavigate} from "react-router-dom";
import StreetfoodForm from "./StreetfoodForm.jsx";

const API = "http://145.24.237.16:8001/streetfoods";

function Create() {
    const navigate = useNavigate();

    async function createItem(payload) {
        await fetch(API, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        navigate("/");
    }

    return (
        <>
            <h2 className="page-title">New streetfood</h2>

            <StreetfoodForm
                onSubmit={createItem}
                onCancel={() => navigate("/")}
            />
        </>
    );
}

export default Create;
