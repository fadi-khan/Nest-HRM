import axios from "axios";

const apiUrl = "http://localhost:8000/employee";
export const leavesApiUrl = "http://localhost:8000/leaves";


export const API = axios.create({
    baseURL: 'http://localhost:8000',
});


API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});




export const getCustomers=async ()=>{


    try {
         return await axios.get(`${apiUrl}`);
   }
   catch (error) {

       console.log(error);
   }
}


export const saveCustomer =async (customer)=>{

    try {
        return (

            await axios.post(apiUrl,customer)
        )
    }
    catch (error) {

        console.log(error);
        throw error.response.data;


    }
}

export const updateCustomer =async (customer,id)=>{
    try {
        return (
        await axios.patch(apiUrl+`/${id}`,customer)
        )
    }
    catch (error) {
        console.log(error);
        throw error.response.data;
    }
}
export const updateLeaveStatus = async ({ id, status }) => {
    try {
        // only send the new status, not the entire leave object
        return await axios.patch(`${leavesApiUrl}/${id}`, { status });
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteCustomer =async (id)=>{
        const response = await axios.delete(apiUrl+`/${id}`)
        console.log('Customer deleted successfully', response.data);
        return response.data;



}

// leaves

export  const getAllLeaves = async ()=>{

    return  await axios.get(leavesApiUrl)

}