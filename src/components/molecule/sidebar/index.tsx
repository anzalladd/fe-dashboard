import React, { ReactElement, useEffect, useState } from "react";
import { useStock } from "../../../context/stock-context";
import CommonService from "../../../service/CommonService";
import Button from "../../atom/button";
import "./sidebar.css";

const Sidebar: React.FunctionComponent = (): ReactElement => {
  const [filter, setFilter] = useState("DESC");
  const { dispatch } = useStock();
  const getFilteredData = async () => {
    const response = await CommonService.getStock({
      params: { sortBy: filter },
    });
    dispatch({
      type: "getStock",
      stock: response.data.data,
      isLoading: false,
    });
  };
  return (
    <div className="sidebar">
      <div className="sidebar__icon"></div>
      <div className="sidebar__filter">
        <select
          className="select"
          onChange={(e) => setFilter(e.target.value)}
          defaultValue="DESC"
        >
          <option value="DESC">Highest</option>
          <option value="ASC">Lowest</option>
        </select>
        <Button title="Filter" onClick={getFilteredData} />
      </div>
    </div>
  );
};

export default Sidebar;
