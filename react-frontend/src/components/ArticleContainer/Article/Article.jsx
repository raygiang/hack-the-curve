import React from 'react'

function Article() {
    return (
        <div className="article">
            <div className="article__content-container">
                <h2 className="article__title">Timothy Goes to School</h2>
                <h3 className="article__date">April 05 2020</h3>
                <p className="article__blurb">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod temp...</p>
                <a href="http://axesscreative.ca" title="Read More">Read More...</a>
            </div>
            <div className="article__feature-image-container">
                <img className="article__feature-image" src="" alt="OMG A PICTURE"/>
            </div>
        </div>
    )
}

export default Article
