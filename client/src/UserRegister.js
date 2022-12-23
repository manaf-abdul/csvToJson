import React, { useEffect } from 'react'
import { useState } from 'react'
import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios'
import { BASEURL } from "./Contants"
import { toast } from "react-toastify"
import papaparse from 'papaparse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons'

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import SearchBar from "material-ui-search-bar";
import { Button } from '@material-ui/core'

import ConfirmationModal from './components/ConfirmationModal'

const UserRegister = () => {

    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)
    const [render, setRender] = useState(false)
    const [data, setData] = useState([])
    const [searched, setSearched] = useState("");
    const [selected, setSelected] = useState()

    const [values, setValues] = useState({
        name: "",
        email: "",
        date: "",
        address: "",
        country: "",
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const editHandler = (row) => {
        setSelected(row._id)
        setValues({
            ...values,
            name: row.name,
            email: row.email,
            country: row.country,
            date: row.dateOfBirth,
            address: row.address
        })
    }

    const modalShow = async (row) => {
        setOpen(true)
        setSelected(row._id)
    }

    const cancelHandler = async () => {
        setSelected()
        setValues({
            ...values,
            name: '',
            email: '',
            country: '',
            date: '',
            address: ''
        })
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${BASEURL}/api/form`)
                setData(data)
                setRows(data)
            } catch (error) {
                toast.error(error.response.data)
            }
        }
        if (setRender) setRender(false)
        getData()

    }, [render])

    function handleDownload() {
        // Convert the documents to CSV format using papaparse
        const datas = data.map((user) => ({
            name: user.name,
            email: user.email,
            dob: user.dateOfBirth,
            address: user.address,
            country: user.country
        }));
        const csv = papaparse.unparse(datas);

        // Trigger a download of the CSV file
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        link.download = 'data.csv';
        link.click();
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            console.table({ values });
            //Check if Edit/Save
            if (selected) {
                const { data } = await axios.post(`${BASEURL}/api/form/edit`, { ...values, _id: selected })
                toast.success('Data Editted Successfully')
            } else {
                const { data } = await axios.post(`${BASEURL}/api/form/register`, { ...values })
                toast.success('Data Submitted Successfully')
            }
            setLoading(false)
            setRender(true)
            setValues({
                ...values,
                name: '',
                email: '',
                country: '',
                date: '',
                address: ''
            })
            setSelected()
            // router.push('/login')
        } catch (error) {
            toast.error(error.response.data)
            setLoading(false)
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        if (selected) setSelected()
    };

    const deleteHandler = async () => {
        try {
            const { data } = await axios.delete(`${BASEURL}/api/form/${selected}`)
            toast.success('Data Deleted Successfully')
            setOpen(false);
            setRender(true)
            setValues({
                ...values,
                name: '',
                email: '',
                country: '',
                date: '',
                address: ''
            })
            setSelected()
        } catch (error) {
            toast.error(error.response.data)
            setOpen(false);
        }
    };

    return (
        <>
            <ConfirmationModal
                open={open}
                onClose={handleClose}
                deleteHandler={deleteHandler}
            />
            <h1 className='jumbotron p-4 bg-primary square text-center' style={{ color: "white", borderRadius: '0px' }}>Form</h1>
            <div className='container fluid'>
                <div>
                    <div className='container fluid col-md-12 col-lg-12 pb-5'>
                        <form onSubmit={handleSubmit}>
                            <div className='row pt-0'>
                                <div className='col-md-12 col-lg-6 pb-2'>
                                    <label>Name</label>
                                    <input type="text"
                                        placeholder="Enter Name"
                                        className="form-control mb-3 p-4"
                                        value={values.name}
                                        name="name"
                                        onChange={handleChange}
                                        required
                                    />
                                    <label>Email</label>
                                    <input type="email"
                                        placeholder="Enter Email"
                                        className="form-control mb-3 p-4"
                                        value={values.email}
                                        name="email"
                                        onChange={handleChange}
                                        required
                                    />
                                    <label>Date of Birth</label>
                                    <input type="date"
                                        placeholder="Select D-O-B"
                                        className="form-control mb-3 p-4"
                                        value={values.date}
                                        name="date"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className=' col-md-12 col-lg-6 pb-2'>
                                    <label>Address</label>
                                    <input type="text"
                                        placeholder="Enter Address"
                                        className="form-control mb-3 p-4"
                                        value={values.address}
                                        name="address"
                                        onChange={handleChange}
                                        required
                                    />
                                    <label>Country</label>
                                    <input type="text"
                                        placeholder="Enter Your Country "
                                        className="form-control mb-3 p-4"
                                        value={values.country}
                                        name="country"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className=' col-md-12 col-lg-12'>

                                <div className='row d-flex justify-content-center'>
                                    <div className='col-md-12 col-lg-5 m-1'>
                                        <button className="btn btn-block btn-primary"
                                            disabled={!values.name || !values.email || !values.date || loading}
                                            type="submit">
                                            {loading ? <SyncOutlined spin /> : selected ? "Edit" : "Submit"}
                                        </button>
                                    </div>

                                    {
                                        selected &&
                                        <div className='col-md-12 col-lg-5 m-1'>
                                            <button className="btn btn-block btn-dark" onClick={cancelHandler}>
                                                Cancel
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='table-body p-2'>
                    <h1 className='text-center p-3'>Table</h1>
                    <div className='row d-flex justify-content-end align-items-center'>
                        <div className='col-sm-1 col-md-2 col-lg-1 mb-2 ml-2'>
                            <Button onClick={handleDownload} style={{ padding: 0, margin: 0,fontSize: "20px" }}>
                                <FontAwesomeIcon icon={faDownload} />
                                <span style={{ padding: 0, margin: 0,fontSize: "10px",fontWeight:"bold" }}>Download CSV</span>
                                </Button>
                        </div>
                        <div className='col-sm-2 col-md-3 col-lg-3 mb-1'>
                            <SearchBar
                                value={searched}
                                onChange={(searchVal) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                            />
                        </div>
                    </div>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Country</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">Date of Birth</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.country}</TableCell>
                                        <TableCell align="left">{row.address}</TableCell>
                                        <TableCell align="left">{row.dateOfBirth}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => editHandler(row)}><FontAwesomeIcon icon={faPen} /></Button>
                                            <Button onClick={() => modalShow(row)}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}

export default UserRegister