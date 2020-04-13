import React, {useState} from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ArticleCard from "./ArticleCard/ArticleCard";
import "./article-container.scss";

const ArticleContainer = () => {
    const selectedCategories = null;
    const GET_ARTICLES = gql`
        query {
            articles(where: {categories_in: ${selectedCategories ? selectedCategories : '[]'}}) {
                Title
                Author
                Publish_Date
                Content
                Featured_Image {
                    url
                }
            }
        }
    `;

    const [articleList, setArticleList] = useState(null);
    const { loading, error, data } = useQuery(GET_ARTICLES);
    
    const mapArticles = () => {
        const articles = data.articles.map((article, index) => (
            <ArticleCard
                key={index}
                title={article.Title}
                author={article.Author}
                featuredImage={article.Featured_Image}
                publishDate={article.Publish_Date}
                content={article.Content}
            />
        ));
        setArticleList(articles);
    }

    if(error) {
        return (
            <div>Error Retrieving Data</div>
        )
    }
    else if(!articleList) {
        if(!loading) mapArticles();
        return (
            <div>Loading...</div>
        )
    }
    
    return (
        <section className="article-container">
            {articleList}
        </section>
    );
};

export default ArticleContainer;
