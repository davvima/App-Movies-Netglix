import React from 'react';

const ContentCard = ({title,overview,poster_path,backdrop_path,id,category,handleDelete}) => {
    return (
        <div className="col-4 col-sm-12 col-md-6 col-lg-3 " >
            <div className="card m-3 text-bg-light">
            <img src={poster_path} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text"><strong>ID: </strong>{id}</p>
                <p className="card-text"><strong>Categoría: </strong>{category}</p>
                <p className="card-text">{overview}</p>
                <button onClick={e=>handleDelete(e,id)} className="btn btn-danger">Eliminar Contenido</button>
                </div>
            </div>
       </div>
    );
};

export default ContentCard;