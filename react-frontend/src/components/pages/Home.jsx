import React from "react";
import ArticlePanel from "../ArticlePanel/ArticlePanel";
import EventsPanel from "../EventsPanel/EventsPanel";
import './home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <ArticlePanel />
      <EventsPanel />
    </div>
  );
};

export default Home;
