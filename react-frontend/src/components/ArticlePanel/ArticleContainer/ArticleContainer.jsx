import React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ArticleCard from "./ArticleCard/ArticleCard";
import "./article-container.scss";

/**
 * The container component for ArticleCards
 * @param {Object} props the props passed into this component.
 */ 
const ArticleContainer = (props) => {
    const {selectedCategories} = props;
    let renderedArticles;

    // GraphQL Query to retrieve articles based on selected categories passed in props
    const GET_ARTICLES = gql`
        query {
            articles(where: {categories_in: [${selectedCategories}]}) {
                Title
                Author
                Publish_Date
                Content
                Featured_Image {
                    url
                }
                categories {
                    Name
                    Color
                }
            }
        }
    `;
    
    const { loading, error, data } = useQuery(GET_ARTICLES, {
        variables: {fetchPolicy: 'no-cache'}
    });
    
    /**
     * Maps the articles stored in data to ArticleCard components. Store the result in renderedArticles.
     */ 
    const mapArticles = () => {
        const articles = data.articles.map((article, index) => (
            <ArticleCard
                key={index}
                title={article.Title}
                author={article.Author}
                featuredImage={article.Featured_Image}
                publishDate={article.Publish_Date}
                content={article.Content}
                categories={article.categories}
            />
        ));
        renderedArticles = articles;
    }

    if(error) {
        return (
            <section className="article-container">
                <div>Error Retrieving Data</div>
            </section>
        )
    }

    if(loading & !data) {
        return (
            <section className="article-container">
                <div>Loading...</div>
            </section>
        )
    }

    mapArticles();
    
    return (
        <section className="article-container">
            {renderedArticles}
        </section>
    );
};

export default ArticleContainer;
