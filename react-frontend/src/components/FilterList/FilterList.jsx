import React, {useState} from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_CATEGORIES = gql`
        query {
            categories {
                id
                Name
            }
        }
    `;

function FilterList() {
    const [categoryList, setCategoryList] = useState(null);
    const { loading, error, data } = useQuery(GET_CATEGORIES);

    const mapCategories = () => {
        const categories = data.categories.map((category, index) => (
            <div key="index">
                <div>{category.id}</div>
                <div>{category.Name}</div>
            </div>
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
            {categoryList}
        </section>
    )
}

export default FilterList
