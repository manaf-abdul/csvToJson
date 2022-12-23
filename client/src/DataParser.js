import React, { useState } from 'react';
import papaparse from 'papaparse';
import axios from 'axios'
import { BASEURL } from "./Contants"
import { toast } from "react-toastify"
// import * as fs from 'fs-react';
// import { saveAs } from 'file-saver';
// import csv from 'csv-parser';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


export const DataParser = () => {
  const [tableData, setTableData] = useState([]);
  const [file, setFile] = useState();
  // Function to convert CSV to table
  // const uploadFileHandler = async (e) => {
  //     const file = e.target.files[0]
  //     setFile(file)
  //     let data=papaparse.parse(file,{
  //       complete: (results) => {
  //         setData(results.data);
  //       },})
  //     console.log("data",data);
  // }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    setFile(file)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post(`${BASEURL}/api/form/parse-file`, formData, config)
      setTableData(data)
    } catch (error) {
      toast.error(error.response.data)
    }
  }

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
    <>
      <h1 className='jumbotron p-4 bg-primary text-center square' style={{ color: "white", borderRadius: '0px' }}>CSV TO JSON</h1>
      <div className='container fluid' style={{ backgroundColor: 'white' }}>
        <div className='row p-1 mb-4'>
          <div className='col-md-4 col-lg-4'>
            <button className='btn btn-block btn-primary btnfont' onClick={downloadCSV}>Download CSV Demo File</button>
          </div>
        </div>
        <div className='row d-flex align-items-center justify-content-center'>
          <div className='col-md-12 col-lg-12'>
            <input type="file" onChange={uploadFileHandler} />
          </div>
        </div>
        <div className='row'>
          {/* {tableData.length > 0 && (
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
          )} */}
          <TableContainer>
            {tableData.length > 0 && <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Object.keys(tableData[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={row._id}>
                    {Object.values(row).map((value) => (
                     <TableCell align="left">{row.email}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
          </TableContainer>
        </div>
        {/* <button onClick={downloadJSON}>Download as JSON</button> */}
      </div>
    </>
  );
};

