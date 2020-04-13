import React from "react";
import ArticleContainer from "../ArticleContainer/ArticleContainer";
import FilterList from "../FilterList/FilterList";

const Home = () => {
  return (
    <div>
      <h1> Home </h1>
      <FilterList />
      <ArticleContainer />
    </div>
  );
};

export default Home;
