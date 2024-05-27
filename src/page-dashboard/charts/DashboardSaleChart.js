// 
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import request from "../../share/request";

// export const data = [
//   ["Year", "Employee", "Customer", "Product"],
//   ["2021", 1000, 400, 200],
//   ["2022", 1170, 460, 250],
//   ["2023", 660, 1120, 300],
//   ["2024", {}, 540, 350],
// ];

export const options = {
  chart: {
    title: "NexSfift Solution",
    subtitle: "Employee, User, and Product: 2024-2027",
  },
};

export const DashboardSaleChart = () => {
  const [listEmp, setListEmp] = useState([]);
  const [listCustomre, setListCustomer] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    getListemp();
    getListCustomer();
    getListProduct();
  }, []);

  const getListemp = () => {
    request("employee", "get").then((res) => {
      if (res) {
        setListEmp(res.list_employee);
      }
    });
  }

  const getListCustomer = () => {
    request("customer", "get").then((res) => {
      if (res) {
        setListCustomer(res.data);
      }
    });
  }

  const getListProduct = () => {
    request("product", "get").then((res) => {
      if (res) {
        setListProduct(res.data);
      }
    });
  }



  const data = [
    ["Year", "Employee", "User", "Product"],
    ["2024", listEmp.length,listCustomre.length, listProduct.length],
    ["2025", 0, 0, 0],
    ["2026", 0, 0, 0],
    ["2027", 0, 0, 0],
  ];


  return (
    <main className="p-3">
        <Chart
        chartType="Bar"
        width="100%"
        height="600px"
        data={data}
        options={options}
      />
    </main>
  );
}