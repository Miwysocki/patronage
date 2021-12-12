import React from "react";
import { useState, useEffect } from "react";
import "./Style.css";

const Page = (props) => {
  const [id, setId] = useState(props.id);
  const [article, setArticle] = useState();
  const [languagesList, setLanguagesList] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetchPage();
    fetchLanguages();
  }, []);

  useEffect(() => {
    fetchPage();
  }, [language]);

  async function fetchPage() {
    const rsp = await fetch(
      "https://" +
        language +
        ".wikipedia.org/w/rest.php/v1/page/" +
        id +
        "/html",
      {
        "Api-User-Agent":
          "MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)",
      }
    );
    const data = await rsp.text();
    setArticle(data);
    return data;
  }
  async function fetchLanguages() {
    const rsp = await fetch(
      "https://en.wikipedia.org/w/rest.php/v1/page/" + id + "/links/language",
      {
        "Api-User-Agent":
          "MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)",
      }
    );
    const data = await rsp.json();
    setLanguagesList(data);
    return data;
  }
  return (
    <div>
      <div>
        {languagesList ? (
          <div>
            <select
              defaultValue={"DEFAULT"}
              className="languagesSelect"
              name="languages"
              onChange={(event) => {
                languagesList.forEach((e) => {
                  if (e.code == event.target.value) {
                    setId(e.key);
                    setLanguage(event.target.value);
                  }
                });
              }}
            >
              <option value="DEFAULT" disabled>
                See in different language
              </option>
              {languagesList.map((e) => (
                <option key={e.code} value={e.code}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          "loading"
        )}
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: article }} />
      </div>
    </div>
  );
};

export default Page;
