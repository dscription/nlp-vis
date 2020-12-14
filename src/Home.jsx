import React, { Component } from 'react';
import Chapter from './Chapter';
import {
  Container,
  SideBar,
  Main,
} from './styled_components/styled_components';


// TODO: Extract all api call functions out into an api/services folder
const BASE_URL = 'http://www.sefaria.org/api/';
let axios = require('axios');
let jsonpAdapater = require('axios-jsonp');

// TODO: Extract all NLP functions out into an NLP folder once they are flushed out.
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();


class Home extends Component {
  state = {
    bookData: '',
    chapters: [],
    searchValue: '',
    index: '',
    selectedChapter: null,
  };

  handleChange = (e) => {
    const searchValue = e.target.value;
    this.setState({ searchValue });
  };

  handleChapterSelect = (chapter) => {
    this.setState({ selectedChapter: chapter });
  };

  handleSearch = async () => {
    const book = this.state.searchValue;
    const response = await axios({
      url: `${BASE_URL}texts/${book}`,
      adapter: jsonpAdapater,
    });

    const bookData = response.data;
    this.setState({ bookData });

    const numberOfChapters = bookData.length;

    const chapters = [];
    for (let i = 0; i < numberOfChapters; i++) {
      const chapter = await axios({
        url: `${BASE_URL}texts/${book}.${i + 1}`,
        adapter: jsonpAdapater,
      });
      chapters.push(chapter);
    }
    this.setState({ chapters });
  };

  render() {
    const { book } = this.state.bookData;
    const { chapters, selectedChapter } = this.state;

    return (
      <Container>
        <SideBar>
          <h1>Torah NLP Analysis</h1>
          <label>Search:</label>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.input}
            placeholder="enter a book from the torah"
          />
          <button onClick={this.handleSearch}>Search For Book</button>
          <h2>Results</h2>
          {chapters && chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <div>
                <button onClick={() => this.handleChapterSelect(chapter)}>
                  {chapter.data.ref}
                </button>
              </div>
            ))
          ) : (
            <h2>No Search Results Yet</h2>
          )}
        </SideBar>
        <Main>
          {selectedChapter ? (
            <Chapter chapter={selectedChapter.data} />
          ) : (
            <h1>No Chapter Selected</h1>
          )}
        </Main>
      </Container>
    );
  }
}

export default Home;
