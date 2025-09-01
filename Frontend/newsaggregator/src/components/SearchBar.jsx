import React, { useState } from "react";
import { useNews } from "./NewsContext";
import {
  Input,
  InputGroup,
  Button,
  Form
} from "reactstrap";

function SearchBar() {
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useNews();

  const handleSearch = () => {
    setSearchQuery(query);
    // console.log("search bar >>", query );
    setQuery('');
  };


  return (
    <div style={{ maxWidth: "300px" }}>
      <Form
      onSubmit={(e) => {
        e.preventDefault(); // prevent page reload
        handleSearch();
      }}
    >
      <InputGroup>
        <Input
          type="text"
          placeholder="Search News"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button color="success" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
    </div>
  );
}

export default SearchBar;