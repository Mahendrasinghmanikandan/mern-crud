import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    contact: "",
  });
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateEnable, setUpdateStatus] = useState(false);

  const fetchData = useCallback(() => {
    axios
      .get("http://localhost:8080/user/")
      .then((response) => {
        setDatas(response.data);
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  });
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e, filed) => {
    setFormData((pre) => ({
      ...pre,
      [filed]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (updateEnable) {
      axios
        .put("http://localhost:8080/user/updateUser", formData)
        .then(() => {
          setFormData((pre) => ({
            name: "",
            email: "",
            age: "",
            contact: "",
          }));
          fetchData();
          setLoading(false);
          toast.success("updated successfully");
          setUpdateStatus(false);
        })
        .catch(() => {
          setLoading(false);
          toast.error("something went wrong updation failed");
        });
      setUpdateStatus(false);
    } else {
      axios
        .post("http://localhost:8080/user/createUser", formData)
        .then(() => {
          setFormData((pre) => ({
            name: "",
            email: "",
            age: "",
            contact: "",
          }));
          fetchData();
          setLoading(false);
          toast.success("created successfully");
        })
        .catch(() => {
          setLoading(false);
          toast.error("something went wrong creation failed");
        });
    }
  };
  const handleDelete = (id) => {
    console.log(id, "k");
    axios
      .delete("http://localhost:8080/user/removeUser", id)
      .then((response) => {
        fetchData();
        toast.success("successfully removed");
      })
      .catch((error) => {
        toast.error("something went wrong");
      });
  };
  const handleUpdate = (value) => {
    setFormData((pre) => ({
      name: value.name,
      id: value._id,
      email: value.email,
      age: value.age,
      contact: value.contact,
    }));
    setUpdateStatus(true);
  };
  return (
    <div>
      <div className="container">
        <div className="left_side">
          <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
            <Stack width="100%" spacing={2}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e, "name")}
              />
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e, "email")}
              />
              <TextField
                label="age"
                variant="outlined"
                name="age"
                value={formData.age}
                onChange={(e) => handleChange(e, "age")}
              />
              <TextField
                label="contact"
                variant="outlined"
                name="contact"
                value={formData.contact}
                onChange={(e) => handleChange(e, "contact")}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                color="warning"
                sx={{ alignSelf: "start" }}
                loading={loading}
              >
                Save
              </LoadingButton>
            </Stack>
          </form>
        </div>
        <div className="right_side">
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "orange" }}>
                    <TableCell>S.no</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas &&
                    datas.map((res, index) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{res.name}</TableCell>
                            <TableCell>{res.email}</TableCell>
                            <TableCell>{res.age}</TableCell>
                            <TableCell>{res.contact}</TableCell>
                            <TableCell onClick={() => handleDelete(res._id)}>
                              <DeleteOutlineOutlinedIcon color="error" />
                            </TableCell>
                            <TableCell onClick={() => handleUpdate(res)}>
                              <BorderColorOutlinedIcon color="success" />
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
