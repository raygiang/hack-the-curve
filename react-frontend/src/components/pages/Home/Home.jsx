import React from "react";
import ArticlePanel from "../../ArticlePanel/ArticlePanel";
import EventsPanel from "../../EventsPanel/EventsPanel";
import './home.scss';

const Home = () => {
  // const postEmail = () => {
  //   const data = { content: "something here" };
  //   fetch("https://cityaxessdata.axesscreative.ca/emails", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  return (
    <main className="home-container">
      <ArticlePanel />
      <EventsPanel />
    </main>
  );
};

export default Home;
