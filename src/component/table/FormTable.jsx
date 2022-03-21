import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "../action/userActions";
import { Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import queryString from "query-string";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import "./FormTable.css";

export default function FormTable() {
  const dispatch = useDispatch();
  const pageNumber = [];
  const [pagination] = useState({
    _limit: 10,
    _page: 1,
    totalUsers: 100
  });

  const [valueAPI, SetValueAPI] = useState({
    _limit: 10,
    _page: 1
  });

  for (
    let i = 1;
    i <= Math.ceil(pagination.totalUsers / valueAPI._limit);
    i++
  ) {
    pageNumber.push(i);
  }
  const hanldeOnClickPagination = (number) => {
    SetValueAPI({
      ...valueAPI,
      _page: number
    });
  };

  useEffect(async () => {
    try {
      const params = queryString.stringify(valueAPI);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?${params}`
      );
      const data = response.data;
      dispatch(getUser(data));
    } catch (error) {
      console.log(error);
    }
  }, [valueAPI]);

  const filter = useSelector((state) => state.userReducer.filter.title);
  const users = useSelector((state) => {
    const FilterUsers = state.userReducer.users.filter((todo) => {
      return (
        todo.title.toLowerCase().indexOf(filter) > -1 ||
        todo.body.toLowerCase().indexOf(filter) > -1
      );
    });
    return FilterUsers;
  });

  const DeleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        dispatch(deleteUser(res.data));
      });
  };

  return (
    <div>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        {users.map((item) => {
          return (
            <tbody key={item.id}>
              <tr>
                <td className="id-item">{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td className="icon-button">
                  <AiFillFileAdd />
                  <AiFillDelete onClick={() => DeleteUser(item.id)} />
                  <AiFillEdit />
                </td>
              </tr>
            </tbody>
          );
        })}

        <Pagination>
          {pageNumber.map((number) => {
            return (
              <Pagination.Item
                name={number}
                onClick={(e) => hanldeOnClickPagination(e.target.name)}
                key={number}
              >
                {number}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </Table>
    </div>
  );
}
