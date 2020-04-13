import React from 'react'
import './article-card.scss';

function ArticleCard(props) {
    const {title, publishDate, content, featuredImage} = props;
    const featureImageURL = process.env.REACT_APP_CITY_AXESS_API + 
            ( featuredImage ? featuredImage.url : '/images/placeholder-image.png' );

    return (
        <div className="article-card">
            <div className="article-card__content-container">
                <h2 className="article-card__title"><a href="http://axesscreative.ca" title="Read More">{title}</a></h2>
                <span className="article-card__date">{publishDate}</span>
                <p className="article-card__blurb" dangerouslySetInnerHTML={{__html: content}}></p>
                <a className="article-card__read-more-link" href="http://axesscreative.ca" title="Read More">Read More</a>
            </div>
            <a href="http://axesscreative.ca" className="article-card__feature-image-container" title="Visit Article">
                <img className="article-card__feature-image" src={featureImageURL} alt="placeholder"/>
            </a>
        </div>
    )
}

export default ArticleCard
