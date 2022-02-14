import React, { ReactElement, useEffect } from "react";
import Sidebar from "../../components/molecule/sidebar";
import AppBar from "../../components/molecule/appbar";
import "./dashboard.css";
import CommonService from "../../service/CommonService";
import { useStock } from "../../context/stock-context";
import { Chart, registerables } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

Chart.register(...registerables);
const Dashboard: React.FunctionComponent = (): ReactElement => {
  const { state, dispatch } = useStock();
  const getStock = async () => {
    const response = await CommonService.getStock();
    dispatch({
      type: "getStock",
      stock: response.data.data,
      isLoading: false,
    });
  };
  const labelsName = state.stock.length
    ? state.stock.map((data: any) => data.product.name)
    : [];
  const datasets = state.stock.length
    ? state.stock.map((data: any) => data.quantity)
    : [];
  useEffect(() => {
    getStock();
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <Sidebar />
      </div>
      <div className="dashboard__content">
        <AppBar />
        {!state.isLoading && (
          <div className="container">
            <div className="dashboard__list">
              <div className="dashboard__list__card">
                <Line
                  datasetIdKey="id"
                  data={{
                    labels: labelsName,
                    datasets: [
                      {
                        label: "Quantity",
                        data: datasets,
                        borderColor: "#f38b4a",
                      },
                    ],
                  }}
                />
              </div>
              <div className="dashboard__list__card">
                <Doughnut
                  datasetIdKey="id"
                  data={{
                    labels: labelsName,
                    datasets: [
                      {
                        label: "Quantity",
                        data: datasets,
                        backgroundColor: [
                          "#f38b4a",
                          "#56d798",
                          "#ff8397",
                          "#6970d5",
                        ],
                      },
                    ],
                  }}
                />
              </div>
              <div className="dashboard__list__card">
                <Bar
                  datasetIdKey="id"
                  data={{
                    labels: labelsName,
                    datasets: [
                      {
                        label: "Quantity",
                        data: datasets,
                        backgroundColor: [
                          "#f38b4a",
                          "#56d798",
                          "#ff8397",
                          "#6970d5",
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className="table">
              <div className="table__header">
                <div className="table__header__title">No</div>
                <div className="table__header__title">Product Name</div>
                <div className="table__header__title">Quantity</div>
              </div>
              {state.stock.map((data: any, index: number) => (
                <div className="table__content" key={data.id}>
                  <div className="table__content__title">{index + 1}</div>
                  <div className="table__content__title">
                    {data.product.name}
                  </div>
                  <div className="table__content__title">{data.quantity}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
