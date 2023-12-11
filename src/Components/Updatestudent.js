import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Studentdata from "./Studentdata";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";
const Updatestudent = () =>{
  const navigate = useNavigate();
    const [data,setData] = useState([]);
    
    
   
    const [flag,setFlag]=useState(false)
    useEffect(() => {
        // Check if retrievedData exists and update form values if available
        let retrievedData = JSON.parse(localStorage.getItem('updateData'));
        setData(retrievedData)
        if (retrievedData) {
          formik.setValues({
            studentName: retrievedData.studentName || "",
            studentDegree: retrievedData.studentDegree || "",
            studentUniname: retrievedData.studentUniname || "",
            studentrollnumber: retrievedData.studentrollnumber || "",
          });
        }
      }, []);
    
  const formik = useFormik({
    initialValues: {
      studentName: "",
      studentDegree: "",
      studentUniname: "",
      studentrollnumber: "",
    },
    validationSchema: Yup.object({
      studentName: Yup.string()
        .required("Student name is required")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Name can only contain alphabetical characters"
        ),
      studentDegree: Yup.string().required("Degree is Required"),

      studentUniname: Yup.string().required("Uni name  is required"),

      studentrollnumber: Yup.number()
        .required("Roll Number is required")
        .typeError("Contains a number"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let a = {
        studentName: values.studentName,
        studentDegree: values.studentDegree,
        studentUniname: values.studentUniname,
        studentrollnumber: values.studentrollnumber,
      };
      setFlag(true)
      try {
        const response = await axios.put(`http://localhost:5000/todo/update-todo/${data._id}`,a);
        setFlag(false)
        
        
        const toaster = response.data.message;
        toast.success(toaster, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        
        resetForm({
          studentName: "",
          studentDegree: "",
          studentUniname: "",
          studentrollnumber: "",
        });
        navigate("/Studentdata")
      } catch (error) {
        if(error.response){
            const toaster = error.response.data.message;
            toast.error(toaster, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setFlag(false)
        }
        
        
        

        console.error("error",error);

      }
     
      
      // Reset the form after submission
      
    },
  });

    return(
        <div>
           <div
      className="backgroundimage"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
        <ToastContainer />
      <div className="grid  grid-cols-1 lg:grid-cols-3 px-10 pt-2">
        <div className="text-center lg:text-start">
          {/* <img src="kuch.png" height={80} width={80} alt="" /> */}
          <i className="fas fa-graduation-cap" style={{ fontSize: "40px" }}></i>
        </div>

        <div>
          <p className="font-bold text- text-center  lg:text-[30px] pt-2 lg:pt-0">Student Management System</p>
        </div>
        <div className="lg:text-end text-center mt-2 lg:mt-0">
        <Link to="/Studentdata">
          <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm lg:text-lg font-bold py-2 mt-1 px-4 rounded-full">
           
            See All Student
           
          </button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center pt-10 px-2 pb-16 lg:pt-24">
        <a className="block max-w-sm w-full p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="font-bold text-center text-2xl pb-2 mb-2 pt-2">
            Student App
          </p>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              id="first_name"
              name="studentName"
              value={formik.values.studentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name...."
            />
            {formik.touched.studentName && formik.errors.studentName ? (
              <div className="text-red-500 text-sm text-center">
                {formik.errors.studentName}
              </div>
            ) : null}
            <select
              id="countries"
              name="studentDegree"
              value={formik.values.studentDegree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              class="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              
              <option value="BS">BS</option>
              <option value="BSC">BSC</option>
              <option value="MSC">MCS</option>
              <option value="MPhil">MPhil</option>
              <option value="PHD">PHD</option>
              <option value="Others">Others...</option>
            </select>
            {formik.touched.studentDegree &&
            formik.errors.studentDegree &&
            formik.touched.studentDegree ? (
              <div className="text-red-500 text-center text-sm">
                {formik.errors.studentDegree}
              </div>
            ) : null}
            <select
              id="countries"
              name="studentUniname"
              value={formik.values.studentUniname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              class="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              
              <option value="University of Punjab">University of Punjab</option>
              <option value="University of Lahore">University of Lahore</option>
              <option value="G C University Faisalabad">
                G C University Faisalabad
              </option>
              <option value="Univrsity of Sargodha">
                Univrsity of Sargodha
              </option>
              <option value="Others...">Others...</option>
            </select>
            {formik.touched.studentUniname && formik.errors.studentUniname ? (
              <div className="text-red-500 text-center text-sm">
                {formik.errors.studentUniname}
              </div>
            ) : null}
            <input
              type="text" disabled
              name="studentrollnumber"
              value={formik.values.studentrollnumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="first_name"
              class="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Roll No..."
            />
            {formik.touched.studentrollnumber &&
            formik.errors.studentrollnumber ? (
              <div className="text-red-500 text-center text-sm">
                {formik.errors.studentrollnumber}
              </div>
            ) : null}
            <div className="text-center pt-4">
                {
                    flag? <button type="button"
                    class="inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-500 rounded-full shadow cursor-not-allowed"
                    disabled="">
                    <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    Loading...
                </button>:
                
              <button class="bg-blue-500 hover:bg-blue-700 text-sm lg:text-lg text-white font-bold py-2 px-4 rounded-full">
                Update Student
              </button>
}
            </div>
          </form>
        </a>
      </div>
    </div>


        </div>
    )
}
export default Updatestudent;