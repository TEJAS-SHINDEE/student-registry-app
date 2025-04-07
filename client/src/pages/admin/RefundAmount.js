import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/admin_css/Table.css';

export default function PaymentInfo() {
  const [stuData, setStuData] = useState([]);// please do not change in this line
  const [userData, setUserData] = useState([]);// please do not change in this line

  const [refundData, setRefundData] = useState([]);
  const [addRefund, setAddRefund] = useState({
    stu_id:"",
    user_id: "",
    refunded_amount: ""
  });

  const [refundEdit, setRefundEdit] = useState({
    refund_id: "",
    stu_id:"",
    user_id: "",
    refunded_amount: ""
  });

  useEffect(() => {
    fetchRefundData();
    fetchStuData();
    fetchUserData();

  }, []);

// FETCH user DATA
const fetchUserData = () => {
    axios
      .get('http://localhost:5000/user')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching user data in user.js:', error);
      });
  };

  // FETCH STUDENT DATA

  const fetchStuData = () => {
    axios
      .get('http://localhost:5000/students')
      .then((response) => {
        setStuData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching Student data in Students.js:', error);
      });
  };

// FETCH ALL_CLASS DATA

  const fetchRefundData = () => {
    axios
      .get('http://localhost:5000/refund')
      .then((response) => {
        setRefundData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching refund data in refund.js:', error);
      });
  };

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;
    setAddRefund((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUserSelect = (event) => {
    setAddRefund((prevData) => ({
      ...prevData,
      user_id: event.target.value
    }));
  };

  const handleStudentSelect = (event) => {
    setAddRefund((prevData) => ({
      ...prevData,
      stu_id: event.target.value
    }));
  };

  const saveRefundData = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/refund', addRefund)
      .then(() => {
        fetchRefundData();
        setAddRefund({
          stu_id:"",
          user_id: "",
          refunded_amount: ""
        });
      })
      .catch((error) => {
        console.log('Error adding data in refund.js:', error);
      });
  };

  // DELETE ALL_CLASS DATA

  const handleDelete = (deleteId) => {
    const confirmDelete = window.confirm("Do you want to delete this data?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/refund/${deleteId}`)
        .then(() => {
          fetchRefundData();
        })
        .catch((error) => {
          console.log('Error deleting refund data in refund.js:', error);
        });
    }
  };

  // EDIT ALL_CLASS DATA

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setRefundEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  };

  const handleRefundEdit = (editId) => {
    axios
      .get(`http://localhost:5000/refund/${editId}`)
      .then((response) => {
        setRefundEdit(response.data[0]);
      })
      .catch((error) => {
        console.log('Error fetching refund data:', error);
      });
  };

  const handleSaveEditData = (refund_id) => {
    axios.put(`http://localhost:5000/refund/${refund_id}`, refundEdit)
      .then(() => {
        fetchRefundData();
      })
      .catch((error) => {
        console.log('Error updating refund data:', error);
      });
  };

  const handleEditUserChange = (event) => {
    const { name, value } = event.target;
    setRefundEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  };

  const handleEditStudentChange = (event) => {
    const { name, value } = event.target;
    setRefundEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  };


  const getUserNames = (userId) => {
    const userInfo = userData.find((userInfo) => userInfo.user_id === userId);
    return userInfo ? userInfo.user_name : '';
  };
  
  const getStuNames = (stuId) => {
    const stuInfo = stuData.find((stuInfo) => stuInfo.stu_id === stuId);
    return stuInfo ? stuInfo.f_name : '';
  };
  
  return (
    <>
{/* ADD DATA MODEL */}
<div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form method="post"  onSubmit={saveRefundData}>
              <div className="modal-header" style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">ADD REFUND DATA</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
               
              <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Name:</label>
                    <select className="form-select" name="student_name" aria-label="Default select example" onChange={handleStudentSelect}>
                        <option value="">Select Student</option>
                        {
                            stuData.map((option) => (
                                <option key={option.stu_id} value={option.stu_id}>
                                    {option.f_name}
                                </option>
                            ))
                        }
                    </select>
                </div>

              <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">User Name:</label>
                    <select className="form-select" name="user_name" aria-label="Default select example" onChange={handleUserSelect}>
                        <option value="">Select User</option>
                        {
                            userData.map((option) => (
                                <option key={option.user_id} value={option.user_id}>
                                    {option.user_name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">refunded_amount:</label>
                  <input type="text" className="form-control" name="refunded_amount" placeholder="Enter  refunded_amount..." onChange={handlePaymentChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

{/* EDIT DATA MODEL */}
<div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form>
              <div className="modal-header"  style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT PAYMENT</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
                
              <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Name:</label>
                    <select className="form-select" name="stu_id" aria-label="Default select example" value={refundEdit.stu_id}  onChange={handleEditStudentChange}>
                        <option value="">Select Student</option>
                        {
                            stuData.map((option) => (
                                <option key={option.stu_id} value={option.stu_id}>
                                    {option.f_name}
                                </option>
                            ))
                        }
                    </select>
                </div>

              <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">User Name:</label>
                    <select className="form-select" name="user_id" aria-label="Default select example" value={refundEdit.user_id}  onChange={handleEditUserChange}>
                        <option value="">Select User</option>
                        {
                            userData.map((option) => (
                                <option key={option.user_id} value={option.user_id}>
                                    {option.user_name}
                                </option>
                            ))
                        }
                    </select>
                </div>
             
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">refunded_amount:</label>
                <input type="text" className="form-control" name='refunded_amount'  onChange={handleEditChange} value={refundEdit.refunded_amount} />
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleSaveEditData(refundEdit.refund_id) }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid body">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
          <div className="custom-table-wrapper">
          <div className='cate-main'>
        <div className='cate-head-main'>
          <h1 className='text-center w-100'  style={{color: "#5caebe"}}><b>REFUNDED AMOUNT</b>
          <button type="button" className="btn btn-info text-white rounded-pill fw-bolder px-4 me-5 mt-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + ADD REFUND
          </button>
          </h1>
        </div>
        </div>
      </div>
     {/* table start ....................................... */}
     <div className="table-container" style={{ margin: '20px' }}>
            <table className="table table-hover brand-table">
        <thead>
          <tr>
              <th scope="col" width="5%"  style={{color: "#5caebe"}}>Refund_Id</th>
              <th width="10%"  style={{color: "#5caebe"}}>Student_name</th>
            <th width="10%"  style={{color: "#5caebe"}}>user_name</th>
            <th width="10%"  style={{color: "#5caebe"}}>refunded_amount</th>
            <th width="15%"><i class="fa-solid fa-gear"  style={{color: "#5caebe"}}></i></th>

          </tr>
        </thead>
        <tbody>
          {
            refundData.map((refund) => {
              return (
                <tr key={refund.refund_id}>
                  <th>{refund.refund_id}</th>
                  <td>{getStuNames(refund.stu_id)}</td>
                  <td>{getUserNames(refund.user_id)}</td>
                  <td>{refund.refunded_amount}</td>
            
                  <td>
                    <div className="dropdown">
                      <button className='btn' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <span>
                        <li>
                          <button type='button' className='dropdown-item' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleRefundEdit(refund.refund_id) }}><i class="fa-solid fa-user-pen" style={{color: "#259745"}}></i> Edit</button>

                          <button type='button' className='dropdown-item btn btn-danger' onClick={() => { handleDelete(refund.refund_id) }}><i class="fa-solid fa-trash-can" style={{color: "#E53E30"}}></i> Delete</button>
                        </li>
                        </span>
                      </ul>
                    </div>

                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table >
    </div>
          </div>
        </div>
      </div>
    </>
  );
}
