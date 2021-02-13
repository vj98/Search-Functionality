import React, { useEffect, useState } from "react";
import Select from "react-select";

function Search() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/list")
      .then((response) => response.json())
      .then((res) => {
        const datas = res.data;

        let a = [];

        datas.map((val) => {
          let b = {
            label: val.name,
            value: val.name,
          };
          a.push(b);
        });

        setData(a);

        console.log(a);
      })
      .catch((error) => console.log(error));
  }, [reload]);

  return (
    <div className="container mt-5">
      <Select options={data} isMulti onChange={() => setReload(!reload)} />
    </div>
  );
}

export default Search;
