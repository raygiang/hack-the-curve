import React from 'react';
import './filter.scss';

/**
 * A filter checkbox for a specific category
 * @param {Object} props the props passed into this component.
 */ 
function Filter(props) {
    const {id, name, toggleCategory} = props;

    return (
        <div className="filter">
            <input className="filter__input hidden" id={name} type="checkbox" name={name} value={id} onClick={toggleCategory} />
            <label className="filter__label" htmlFor={name} role="button">{name}</label>
        </div>
    )
}

export default Filter
