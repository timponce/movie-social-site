import React from "react";
import { useDispatch } from "react-redux";
import { deleteList } from "../features/lists/listSlice";

function ListItem({ list }) {
  const dispatch = useDispatch();

  return (
    <div className="list">
      <div>{new Date(list.createdAt).toLocaleString("en-US")}</div>
      <h2>{list.listName}</h2>
      <button onClick={() => dispatch(deleteList(list._id))} className="close">
        X
      </button>
    </div>
  );
}

export default ListItem;
