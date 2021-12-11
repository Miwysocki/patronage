import React from "react";
import { useState, useEffect } from "react";
import Languages from "./Languages";
import Page from "./Page";
import "./Style.css";

const Search = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showArticle, setshowArticle] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [id, setId] = useState(null);
  const [history, setHistory] = useState([]);

  async function fetchArticles(query) {
    if (!query) return;
    const rsp = await fetch(
      "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" + query
    );
    const data = await rsp.json();
    console.log(data);
    setData(data);
    setshowArticle(false);
    setLoading(false);
    return data;
  }

  function showList() {
    if (loading) return <div></div>;
    else
      return (
        <div className="tile">
          {" "}
          {data.pages.map((e) => (
            <div className="tile" key={e.id}>
              {e.thumbnail && (
                <a
                  href="#"
                  onClick={() => {
                    setId(e.key);
                    setshowArticle(true);
                    setHistory((history) => [...history, e.key]);
                    console.log("history " + history);
                  }}
                >
                  <img src={e.thumbnail.url} alt=""></img>
                  {e.title}
                </a>
              )}
              {e.description}
            </div>
          ))}
        </div>
      );
  }

  function handleClick() {
    setShowHistory(!showHistory);
  }

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(event) => fetchArticles(event.target.value)}
      />
      <button onClick={handleClick}>History</button>
      <div>{showHistory ? history.map((e) => <div>{e} </div>) : ""}</div>
      {showArticle && <Page id={id} />}
      {!showArticle && showList()}
    </div>
  );
};

export default Search;
