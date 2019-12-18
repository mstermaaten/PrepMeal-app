import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Container, Row, Col, setConfiguration } from "react-grid-system";
import UpdateService from "../../../api/updateService";
import AuthService from "../../../api/authService";

setConfiguration({
  containerWidths: [540, 820, 1100, 1240],
  breakpoints: [576, 768, 1150, 1200]
});

function AllUsers(props) {
  const { users } = props;
  const updateService = new UpdateService();
  const authService = new AuthService();
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const run = async () => {
      await first();
    };
    run();
  }, []);

  const first = async () => {
    const thisActiveUser = await authService.getCurrent();
    setActiveUser(thisActiveUser);
  };

  const addFollow = async id => {
    try {
      const added = await updateService.addFollower(id);
      first();
      return added;
    } catch (err) {
      console.log(err);
    }
  };

  const removeFollow = async id => {
    try {
      const added = await updateService.removeFollower(id);
      first();
      return added;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="explore-all-users-wrapper column">
      {users.length > 0 && activeUser ? (
        <Container className="all-users-parent">
          <Row>
            {users.map((user, i) => {
              return (
                <Col lg={4} md={6}>
                  <UserCard
                    key={i}
                    user={user}
                    addFollow={addFollow}
                    removeFollow={removeFollow}
                    activeUser={activeUser}
                  />
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
