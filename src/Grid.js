import React from 'react';
import "./grid.css";

export default function Grid({ e }) {
    return (
        <div className='card'>
            <ul class="card-list">
                <li>
                    <article>
                        <h1>{e["name"] ? e["name"].slice(0, 27) : ""}...</h1>
                        <section>
                            <img src={e['thumbnail_url']} alt={e['thumbnail_alt_text']} className="cardImage" />
                            <div class="content">
                                <h3> {e['name']} </h3>
                                <p> {e['description']} </p>
                            </div>
                        </section>
                        <p className='cardLoc'>Created At: {e["created_at"]} </p>
                    </article>
                </li>
            </ul>
        </div>
    );
}
