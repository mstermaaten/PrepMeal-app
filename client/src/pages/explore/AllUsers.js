import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Container, Row, Col, setConfiguration } from "react-grid-system";

setConfiguration({
  containerWidths: [540, 820, 1100, 1240],
  breakpoints: [576, 768, 1150, 1200]
});

function AllUsers(props) {
  const { users } = props;

  return (
    <div className="explore-all-users-wrapper column">
      {users.length > 0 ? (
        <Container
          className="all-users-parent"
        >
          <Row>
            {users.map((user, i) => {
              return (
                <Col lg={4} md={6}>
                  <UserCard key={i} user={user} />
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default AllUsers;



  // const onWheel = e => {
  //   e.preventDefault();
  //   var container = document.getElementById("category-header");
  //   var containerScrollPosition = document.getElementById("category-header")
  //     .scrollLeft;
  //   container.scrollTo({
  //     top: 0,
  //     left: containerScrollPosition + e.deltaY,
  //     behaviour: "smooth" //if you want smooth scrolling
  //   });
  // };