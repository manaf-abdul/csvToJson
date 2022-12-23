import React, { useState } from 'react';
import papaparse from 'papaparse';
import axios from 'axios'
import { BASEURL } from "./Contants"
import { toast } from "react-toastify"
// import * as fs from 'fs-react';
import { saveAs } from 'file-saver';
// import csv from 'csv-parser';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from '@material-ui/core'


export const DataParser = () => {
  const [tableData, setTableData] = useState([]);
  const [file, setFile] = useState();

  // Function to convert CSV to table
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

  //Function to save to DB
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${BASEURL}/api/form/save-to-db`, tableData)
      toast.success("Data Saved Successfully in the Database")
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  // Function to download data as JSON file
  const downloadCSV = () => {
    const data = JSON.stringify(tableData);
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, 'data.json');
  };

  return (
    <>
      <h1 className='jumbotron p-4 bg-primary text-center square' style={{ color: "white", borderRadius: '0px' }}>CSV TO JSON</h1>
      <div className='container fluid' style={{ backgroundColor: 'white' }}>
        <div className='row p-1 mb-4'>
          <div className='col-md-3 col-lg-3'>
            <button className='btn btn-primary btnfont' onClick={downloadCSV}>Download CSV Demo File</button>
          </div>
        </div>
        <div className='p-3 mt-4' style={{ backgroundColor: "whitesmoke" }}>
          <div className='row d-flex justify-content-center'>
            <div className='col-sm-12 col-md-4 col-lg-4 mb-1 text-center'>
              <label for="inputTag" className='fileLabel'>
                Upload CSV
                <input id="inputTag" className='fileInput' type="file" onChange={uploadFileHandler} />
              </label>
            </div>
            <div className='col-sm-12 col-md-4 col-lg-4 mb-1 text-center'>
              {/* <label for="inputTag" className='fileLabel'> */}
              <button className='btn-custom' onClick={handleSubmit}>
                Save To DB
              </button>
              {/* </label> */}
            </div>
            <div className='col-sm-12 col-md-4 col-lg-4 mb-1 text-center'>
              <label for="" className='fileLabel' onClick={downloadCSV}>
                Download JSON
                {/* <input id="inputTag" className='fileInput' type="file" onChange={downloadCSV} /> */}
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 mt-4'>

              <h3 className='text-center' style={{ color: "black" }}>Data</h3>
            </div>
            <TableContainer>
              {tableData.length > 0 ? <Table aria-label="simple table">
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
              </Table>
                : <h3 className='text-center p-4'>
                  No Data , Please Upload a CSV to view it in the table
                </h3>}
            </TableContainer>
          </div>
        </div>
        {/* <button onClick={downloadJSON}>Downloa
  align-items: center;d as JSON</button> */}
      </div>
    </>
  );
};

