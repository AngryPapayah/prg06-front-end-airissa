function StreetfoodsItem({item, onDelete, onEdit}) {
    return (
        <article className="card">
            <div className="card__header">
                <h2 className="card__title">{item.name}</h2>
                <span className="card__price">€ {item.price}</span>
            </div>

            <p className="card__location">
                {item.city}, {item.country}
            </p>

            <p className="card__description">{item.description}</p>

            <div className="card__meta">
                <span className="card__badge">{item.taste}</span>
            </div>

            <div className="card__actions">
                <button className="btn btn--primary" onClick={onEdit}>
                    Bewerken
                </button>
                <button className="btn btn--danger" onClick={onDelete}>
                    Verwijderen
                </button>
            </div>
        </article>
    );
}

export default StreetfoodsItem;
