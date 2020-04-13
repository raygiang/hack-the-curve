import React, {useState} from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Filter from './Filter/Filter';
import './filter-list.scss';

const GET_CATEGORIES = gql`
        query {
            categories {
                id
                Name
            }
        }
    `;

/**
 * The container component for all Filters
 * @param {Object} props the props passed into this component.
 */ 
function FilterList(props) {
    const {toggleCategory} = props;
    const [categoryList, setCategoryList] = useState(null);
    const {loading, error, data} = useQuery(GET_CATEGORIES);

    /**
     * Maps the categories stored in data to Filter components. Update the CategoryList state with the result.
     */ 
    const mapCategories = () => {
        const categories = data.categories.map((category, index) => (
            <Filter
                key={index}
                id={category.id}
                name={category.Name}
                toggleCategory={toggleCategory}
            />
        ));
        setCategoryList(categories);
    }

    if(error) {
        return (
            <div>Error Retrieving Data</div>
        )
    }
    else if(!categoryList) {
        if(!loading) mapCategories();
        return (
            <div>Loading...</div>
        )
    }

    return (
        <section className="filter-list">
            <h2 className="filter-list__heading">Filters</h2>
            {categoryList}
        </section>
    )
}

export default FilterList
