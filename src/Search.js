import React from "react";
import { useState, useEffect } from "react";

const Search = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState();
  const [showDetails, setShowDetails] = useState(false);

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

  async function fetchPage(query) {
    if (!query) return;
    const rsp = await fetch(
      "https://en.wikipedia.org/w/rest.php/v1/page/" + query + "/html",
      {
        "Api-User-Agent":
          "MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)",
      }
    );
    const d = await rsp.text();
    console.log(d);
    setArticle(d);
    setShowDetails(true);
    return d;
  }

  function showList() {
    if (loading) return <div></div>;
    else
      return (
        <div className="tile">
          {" "}
          {data.pages.map((e) => (
            <div key={e.id}>
              {e.thumbnail && (
                <a href="#" onClick={() => showPage(e.key)}>
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
  function showPage(key) {
    fetchPage(key);

    return <div dangerouslySetInnerHTML={{ __html: article }} />;
  }

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(event) => fetchArticles(event.target.value)}
      />
      {showDetails && showPage()}
      {!showDetails && showList()}
    </div>
  );
};

export default Search;
