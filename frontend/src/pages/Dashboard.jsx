import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ListForm from "../components/listForm";
import ListItem from "../components/ListItem";
import { getLists, reset } from "../features/lists/listSlice";
import Spinner from "../components/Spinner";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { lists, isLoading, isError, message } = useSelector(
    (state) => state.lists
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getLists());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Lists Dashboard</p>
      </section>
      <ListForm />
      <section className="content">
        {lists.length > 0 ? (
          <div className="lists">
            {lists.map((list) => (
              <ListItem key={list._id} list={list} />
            ))}
          </div>
        ) : (
          <h3>You have not created any lists</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
