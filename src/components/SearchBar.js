import React, { useEffect, useState } from "react";
import "./componentcss/SearchBar.css";
import axios from "axios";
import DOMPurify from "dompurify";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeHolderText, setPlaceHolderText] = useState("Programming");
  const [debouncedTerm, setDebouncedTerm] = useState(placeHolderText);
  const [results, setResults] = useState([]);

  //this would update debounced term when user stops for 500ms after typing
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  //if debounced term changes make a api call to the wikipedia api
  useEffect(() => {
    const searchQuery = async () => {
      const data = await axios
        .get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            origin: "*",
            format: "json",
            list: "search",
            srlimit: 5,
            srsearch: debouncedTerm,
          },
        })
        .then((res) => res.data.query.search);

      // console.log(data);
      setResults(data);
    };

    if (debouncedTerm) {
      searchQuery();
    }
  }, [debouncedTerm]);

  /* useEffect(() => {
    //cannot use async-await directly inside the useEffect
    //create another function and set state

    const searchQuery = async () => {
      const data = await axios
        .get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            origin: "*",
            format: "json",
            list: "search",
            srlimit: 5,
            srsearch: searchTerm || placeHolderText,
          },
        })
        .then((res) => res.data.query.search);

      console.log(data);
      setResults(data);
    };

    if (searchTerm === "" && results.length === 0) {
      searchQuery();
    } else {
      let timeoutId = setTimeout(() => {
        if (searchTerm || placeHolderText) {
          searchQuery();
        }
      }, 500);

      return function cleanup() {
        clearTimeout(timeoutId);
      };
    }
  }, [searchTerm]); */

  const onChangeHanlder = (event) => {
    setSearchTerm(event.target.value);
  };

  const removePlaceHolderText = () => {
    setPlaceHolderText("");
  };

  //console.log(results);
  const renderedList = results.map((res) => {
    return (
      <div className="item-container" key={res.pageid}>
        <div>
          <div className="title-wrapper">
            <h2 id="title">{res.title}</h2>
            <a
              target="_blank"
              href={`https://en.wikipedia.org?curid=${res.pageid}`}
              rel="noreferrer"
            >
              <div className="button-container">
                <button>Wikipedia</button>
              </div>
            </a>
          </div>
          <hr />
          <div className="para-wrapper">
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(res.snippet),
              }}
            ></p>
          </div>
        </div>
      </div>
    );
  });

  const renderContent = () => {
    return (
      <>
        <div className="input-container">
          <i class="fas fa-search"></i>
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={onChangeHanlder}
            placeholder={placeHolderText}
            onClick={removePlaceHolderText}
            onFocus={removePlaceHolderText}
          />
        </div>
        <div className="list-container">{renderedList}</div>
      </>
    );
  };

  return renderContent();
};

export default SearchBar;
