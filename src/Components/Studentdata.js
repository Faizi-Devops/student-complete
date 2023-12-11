import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Studentdata = () =>{
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState(''); 
    const [filterData, setFilterData] = useState([]);
    const [flag,setFlag]=useState("")
  
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todo/get-todo");
        setData(response.data.Todo);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData(); // Fetch data initially
  
    //   const intervalId = setInterval(() => {
    //     fetchData(); // Fetch data every 1 second
    //   }, 1000);
  
    //   // Clear the interval on component unmount
    //   return () => clearInterval(intervalId);
    }, []);
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
        
      };
      useEffect(() => {
        // Filter data based on both input value and selected value
        const filteredData = data.filter(item =>
          item.studentName.toLowerCase().includes(inputValue.toLowerCase()) &&
          (selectedValue === '' || item.studentDegree === selectedValue) // Replace 'someOtherProperty' with your actual property name
        );
        setFilterData(filteredData);
      }, [data, inputValue, selectedValue]);
    // Filter data based on input value
    // const filteredData = data.filter(item =>
    //   item.studentName.toLowerCase().includes(inputValue.toLowerCase())
    //   // Replace 'someProperty' with the property name you want to filter by
    // );
    
    const onDeleteHandler = async(valueing) =>{
        setFlag(valueing)
        console.log(valueing)
        try {
            const response = await axios.delete(`http://localhost:5000/todo/delete-todo/${valueing}`);
            setFlag(false)
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            

        } catch (error) {
            setFlag("")
            console.log(error)

        }

    }
    const onUpdateData = (valueing) =>{
        localStorage.setItem('updateData', JSON.stringify(valueing));
    }
    
    
    
    
    return(
        <div className="bg-[#120F1F] min-h-screen max-h-full px-0 lg:px-20">
            <ToastContainer />
            

<div class="relative overflow-x-auto shadow-md   sm:rounded-lg ">
    <div className="grid lg:gap-10 md:gap-4  pb-7 grid-cols-1 md:grid-cols-2 px-8 lg:px-0 lg:grid-cols-3">
    <div>
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="first_name" value={inputValue}
        onChange={handleInputChange} class="bg-gray-50 border border-gray-300 max-w-sm text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by name" required />
        </div>
        <div >
        <label for="countries" class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
<select id="countries" value={selectedValue} onChange={handleSelectChange} class="bg-gray-50 max-w-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="">All</option>
  
  <option value="BS">BS</option>
  <option value="BSC">BSC</option>
  <option value="MSC">MCS</option>
  <option value="MPhil">MPhil</option>
  <option value="PHD">PHD</option>
  <option value="Others">Others...</option>
</select>

        </div>
        <div className="pt-7 lg:pt-7 md:pt-3 text-center md:text-start lg:text-end">
        <Link to="/">
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none   font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            
            
            Add new Student
            
            </button>
            </Link>
        </div>
        
    </div>

    
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded  dark:text-gray-400">
        <thead className="text-xs  text-gray-700 border-b uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-[#252136] text-white">
                <th scope="col" class="px-6 py-4">
                    #
                </th>
                <th scope="col" class="px-6 py-2 ">
                    Name
                </th>
                <th scope="col" class="px-6 py-2">
                    Degree
                </th>
                <th scope="col" class="px-6 py-2">
                    University
                </th>
                <th scope="col" class="px-6 py-2">
                    Roll No
                </th>
                <th scope="col" class="px-6 py-2">
                    Delete
                </th>
                <th scope="col" class="px-6 py-2">
                    Update
                </th>
            </tr>
        </thead>
        <tbody >
        {data.length === 0 && <p className="text-red-500  pt-10">There are no students records avilable now</p>}
            {
                filterData?.map((value,index)=>{
                    return(
                        <tr class="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4   bg-[#252136] font-medium text-white whitespace-nowrap dark:text-white">
                    {index+1}
                </th>
                <td class="px-6 py-4 text-white bg-[#252136]">
                    {value.studentName}
                </td>
                <td class="px-6 bg-[#252136] text-white py-2">
                    {value.studentDegree}
                </td>
                <td class="px-6 bg-[#252136] text-white py-2">
                    {value.studentUniname}
                </td>
                <td class="px-6 bg-[#252136] text-white py-2">
                    {value.studentrollnumber}
                </td>
                <td class="px-6 bg-[#252136] py-2">
                    {
                        flag === value._id?<button type="button"
                        class="inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-red-500 rounded shadow cursor-not-allowed"
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
                    
                    <button class="bg-red-500  text-white font-bold py-2 px-4 rounded" onClick={()=>onDeleteHandler(value._id)}>
  Delete
</button>
                }
                </td>
                <td class="px-6 bg-[#252136] py-2">
                    <Link to={`/Updatestudent/${value._id}`}>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>onUpdateData(value)}>
  Update
</button>
</Link>
                </td>
               
            </tr>

                    )
                })
            }
            
            
            
            
            
        </tbody>
    </table>
</div>


        </div>

    )
}
export default Studentdata;