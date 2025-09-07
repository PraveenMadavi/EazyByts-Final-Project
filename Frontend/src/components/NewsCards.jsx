import React from 'react';
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import NewsCard from './NewsCard';
import { useNews } from './NewsContext';
import SearchBar from './SearchBar';
import '../styles/CustomPagination.css';
import { useEffect } from 'react';

function NewsCards(props) {
  const { page, setPage, searchQuery } = useNews();
  //   console.log("From props >> ", props.news);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [page]);


  return (
    <>
      <Container className="pt-4">
        <div className="d-flex justify-content-center pt-5">
          <SearchBar />
        </div>

        <div className="d-flex justify-content-center my-1 ">
          <div>Showing results ... {searchQuery}</div>
        </div>

        <Row xs="1" md="3" lg="4">
          {props.news.map((article, index) => (
            <Col key={index} className="mb-3 d-flex" >
              <NewsCard article={article} />
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <div className="d-flex justify-content-center">
          <Pagination
            aria-label="Page navigation"
            size="md"
            className="custom-pagination"
          >
            <PaginationItem>
              <PaginationLink
                first

                onClick={(e) => {
                  e.preventDefault();
                  setPage(1);
                }}
              >
                First
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                previous
                onClick={(e) => {
                  if (page > 1) {
                    e.preventDefault();
                    setPage(page - 1);
                  }
                }}>
                Previous
              </PaginationLink>
            </PaginationItem>

            {page > 1 && (
              <PaginationItem >
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page - 1);
                  }}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem active>
              <PaginationLink onClick={(e) => {
                e.preventDefault();
                setPage(page);

              }}>
                {page}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem >
              <PaginationLink onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink

                next
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </Container >
    </>
  );
}

export default NewsCards;
