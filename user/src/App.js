import React, { useState } from "react";
import "./App.css";

function App() {
  const [info, setInfo] = React.useState([]);
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [addFormData, setAddFormData] = React.useState({
    dealType: "",
    name: "",
    status: "",
  });

  function DisplayData(data) {
    return data.map((u) => {
      return (
        <tr>
          <td>{u.dealID}</td>
          <td>{u.dealType}</td>
          <td>{u.name}</td>
          <td>{u.updated}</td>
          <td>{u.status}</td>
        </tr>
      );
    });
  }

  //This function below allows you to search through the current data
  function FilterData() {
    let filter;
    filter = input.toLowerCase();
    console.log(filter);

    let mapped = info.filter((x) => x.name.toLowerCase().indexOf(filter) > -1);
    console.log(mapped);

    setFiltered(mapped);
  }

  //This is for adding new data to the table
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    console.log(fieldValue);
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    //console.log(newFormData)
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    /* const newData = {
      dealType: addFormData.dealType,
      name: addFormData.name,
      status: addFormData.status,
    };*/
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addFormData),
    };
    const newDataSet = [...info, addFormData];
    console.log(newDataSet);
    setInfo(newDataSet);

    fetch("/api/deals", options).then((res) => {
      console.log(res);
    });
    //Clear all fields after they have been submitted.
    document.getElementById("field1").value = "";
    document.getElementById("field2").value = "";
    document.getElementById("field3").value = "";
  };

  React.useEffect(() => {
    fetch("/api/deals")
      .then((res) => res.json())
      .then((info) => setInfo(info.message));
  }, []);

  React.useEffect(() => {
    input && FilterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1 className="title">
            <strong>Company Data Directory</strong>
          </h1>
        </div>
      </header>
      <div className="searchForm">
        <input
          type="text"
          id="search"
          className="dataSearch"
          value={input}
          required="required"
          aria-label="Large"
          placeholder="Search by Deal Name"
          onChange={(event) => setInput(event.target.value)}
        />
      </div>
      <div>
        <h2 className="titleTwo">*Add New Company Data</h2>
        <form className="insertNew" onSubmit={handleAddFormSubmit}>
          <input
            className="newInput"
            id="field1"
            type="text"
            name="dealType"
            required="required"
            placeholder="Enter an DealType..."
            onChange={handleAddFormChange}
          />
          <input
            className="newInput"
            id="field2"
            type="text"
            name="name"
            required="required"
            placeholder="Enter a Name..."
            onChange={handleAddFormChange}
          />
          <input
            className="newInput"
            id="field3"
            type="text"
            name="status"
            required="required"
            placeholder="Enter an Status..."
            onChange={handleAddFormChange}
          />
          <button className="btnTwo" type="submit">
            Add
          </button>
        </form>
      </div>
      <div className="container">
        <table id="myTable" className="table table-striped table-hover">
          <thead className="head">
            <tr className="tRow">
              <th className="tHeader"> Deal ID</th>
              <th className="tHeader"> Deal Type</th>
              <th className="tHeader"> Deal Name</th>
              <th className="tHeader"> Updated</th>
              <th className="tHeader"> Status</th>
            </tr>
          </thead>
          <tbody id="data">
            {input ? DisplayData(filtered) : DisplayData(info)}
          </tbody>
        </table>

        <div className="footer"></div>
      </div>
    </div>
  );
}

export default App;
