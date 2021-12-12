import React from "react";
import { useState } from "react";
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
              {
                <a
                  href="#"
                  onClick={() => {
                    setId(e.key);
                    setshowArticle(true);
                    setHistory((history) => [...history, e.title]);
                  }}
                >
                  {e.thumbnail && <img src={e.thumbnail.url} alt=""></img>}
                  <p>{e.title}</p>
                </a>
              }
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
        className="searchBar"
        placeholder="Search..."
        onChange={(event) => fetchArticles(event.target.value)}
      />
      <button className="button" onClick={handleClick}>
        {showHistory ? "hide" : "show history"}
      </button>
      <div>{showHistory ? history.map((e) => <div>{e} </div>) : ""}</div>
      {showArticle && <Page id={id} />}
      {!showArticle && showList()}
    </div>
  );
};

export default Search;
