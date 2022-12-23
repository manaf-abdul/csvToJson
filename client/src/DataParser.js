import React, { useState } from 'react';
import papaparse from 'papaparse';
import axios from 'axios'
import { BASEURL } from "./Contants"
import { toast } from "react-toastify"
// import * as fs from 'fs-react';
// import { saveAs } from 'file-saver';
// import csv from 'csv-parser';

export const DataParser = () => {
  const [tableData, setTableData] = useState([]);
  const [file, setFile] = useState();
  const [data, setData] = useState();
  // Function to convert CSV to table
  const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      setFile(file)
      let data=papaparse.parse(file,{
        complete: (results) => {
          setData(results.data);
        },})
      console.log("data",data);
  }
  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0]
  //   setFile(file)
  //   try {
  //     const formData = new FormData()
  //     formData.append('file', file)
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }
  //     const { data } = await axios.post(`${BASEURL}/api/form/parse-file`, formData, config)
  //   } catch (error) {
  //     toast.error(error.response.data)
  //   }
  // }

  console.log("11111111111", tableData);
  // Function to download data as JSON file
  // const downloadJSON = () => {
  //   const data = JSON.stringify(tableData);
  //   const blob = new Blob([data], { type: 'application/json' });
  //   saveAs(blob, 'data.json');
  // };

  const downloadCSV = () => {
    const link = document.createElement('a');
    link.href = '/test.csv';
    link.download = 'test.csv';
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className='row d-flex justify-content-center'>
      <div>
        <button onClick={downloadCSV}>Download CSV</button>
      </div>
      <input type="file" onChange={uploadFileHandler} />
      {tableData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value) => (
                  <td key={value}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* <button onClick={downloadJSON}>Download as JSON</button> */}
    </div>
  );
};

