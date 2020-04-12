import React from "react";
import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
import "./article-container.scss";
import Article from "./Article/Article";

// const GET_ARTICLES = gql`
//     query {
//         articles {
//             Title
//             Author
//             Publish_Date
//             Content
//             Featured_Image {
//                 url
//             }
//         }
//     }
// `;

// function Hello() {
    // const { loading, error, data } = useQuery(GET_ARTICLES, {
        // variables: { language: 'english' },
    // });
    // if (loading) return <p>Loading ...</p>;
    // return <h1>Hello {data.greeting}!</h1>;
// }

const ArticleContainer = () => {
    return (
        <div>
            <h1>Article Container</h1>
            <Article />
        </div>
    );
};

export default ArticleContainer;
