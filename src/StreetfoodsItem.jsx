import {Link} from "react-router-dom";

function StreetfoodsItem({item, onDelete}) {
    const id = item.id ?? item._id;

    return (
        <article className="card relative">
            {/* klikbare kaart → detail */}
            <Link
                to={`/streetfoods/${id}`}
                className="absolute inset-0 z-0"
                aria-label={`Check the details of ${item.name}`}
            />

            <div className="relative z-10">
                <h3 className="card__title">{item.name}</h3>
                <p className="card__location">
                    {item.city}, {item.country}
                </p>

                <div className="card__actions">
                    {/*  BEWERKEN */}
                    <Link
                        to={`/edit/${id}`}
                        className="btn btn--primary"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Edit
                    </Link>

                    {/*  DELETE */}
                    <button
                        className="btn btn--danger"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
}

export default StreetfoodsItem;
