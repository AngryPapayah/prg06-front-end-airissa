import {Link} from "react-router-dom";

function StreetfoodsItem({item, onDelete}) {
    const id = item.id ?? item._id;

    return (
        <article className="card relative">
            <Link
                to={`/streetfoods/${id}`}
                className="absolute inset-0 z-0"
                aria-label={`Bekijk details van ${item.name}`}
            />
            <div className="relative z-10">
                <h3 className="card__title">{item.name}</h3>
                <p className="card__location">{item.city}, {item.country}</p>

                <button
                    className="btn btn--danger"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    Verwijderen
                </button>
            </div>
        </article>
    );
}

export default StreetfoodsItem;
