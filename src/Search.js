import React from "react";
import { useState, useEffect } from "react";
import Languages from "./Languages";
import Page from "./Page";
import "./Style.css";

const Search = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [id, setId] = useState(null);

  async function fetchArticles(query) {
    if (!query) return;
    const rsp = await fetch(
      "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" + query
    );
    const data = await rsp.json();
    console.log(data);
    setData(data);
    setShowDetails(false);
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
                    setShowDetails(true);
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

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(event) => fetchArticles(event.target.value)}
      />
      {showDetails && <Page id={id} />}
      {!showDetails && showList()}
    </div>
  );
};

export default Search;
