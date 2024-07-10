import React from 'react';
import style from '../../styles/loader.module.scss';

const Loader = () => {
    return (
        <div className={style.loadingWrapper}>
            <div className={`spinner-border text-primary ${style.spinner}`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
export default Loader;