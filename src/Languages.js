import React from "react";
import { useState, useEffect } from "react";
const Languages = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = props.id;
  async function doFetch(id) {
    const rsp = await fetch(
      "https://en.wikipedia.org/w/rest.php/v1/page/" + id + "/links/language",
      {
        "Api-User-Agent":
          "MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)",
      }
    );
    const data = await rsp.json();
    setData(data);
    setLoading(false);
    console.log(data);
    return data;
  }
  useEffect(() => {
    doFetch();
  }, []);
  return (
    <div>
      <select name="languages">
        {!loading && data.map((e) => <option value={e.key}>{e.title}</option>)}
      </select>
    </div>
  );
};

export default Languages;
