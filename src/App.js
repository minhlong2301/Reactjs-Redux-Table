import FormTable from "./component/table/FormTable";
import FormInput from "./component/form_input/FormInput";
import { searchUser } from "./component/action/userActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";

function App() {
  const [value, Setvalue] = useState("");
  const dispathch = useDispatch();

  const handleOnChange = (e) => {
    Setvalue(e.target.value);
    dispathch(searchUser(e.target.value));
  };

  return (
    <div>
      <input
        value={value}
        type="text"
        placeholder="Search"
        onChange={handleOnChange}
      />
      <FormTable />
      <>
        <FormInput />
      </>
    </div>
  );
}

export default App;
