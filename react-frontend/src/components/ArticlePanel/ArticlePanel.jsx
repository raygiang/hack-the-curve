import React, {useState} from 'react';
import FilterList from './FilterList/FilterList';
import ArticleContainer from './ArticleContainer/ArticleContainer';
import './article-panel.scss';

/**
 * The article panel containing a list of articles and the filters sidebar
 */ 
function ArticlePanel() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    let categoryMap = new Map();

    /**
     * Toggles the category of the clicked checkbox between selected and not selected
     * @param {Object} e the click event
     */ 
    const toggleCategory = (e) => {
        if(e.target.checked) {
            categoryMap.set(parseInt(e.target.value), true);
        }
        else {
            categoryMap.delete(parseInt(e.target.value));
        }

        setSelectedCategories([...categoryMap.keys()]);
    }

    return (
        <div className="article-panel">
            <FilterList className="article-panel__filters" toggleCategory={toggleCategory} />
            <ArticleContainer className="article-panel__article-container" selectedCategories={selectedCategories} />
        </div>
    )
}

export default ArticlePanel
