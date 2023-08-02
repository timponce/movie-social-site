import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../features/lists/listSlice";

function ListForm() {
  const [listName, setListName] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createList({ listName }));
    setListName("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">List</label>
          <input
            type="text"
            name="listName"
            id="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Create List</button>
        </div>
      </form>
    </section>
  );
}

export default ListForm;
