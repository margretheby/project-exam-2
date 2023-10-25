import GetData from "../GetData/GetData.jsx";

function DisplayProfileBookings(url) {
    
    const { data } = GetData(url)
    
    console.log(data);
}

export default DisplayProfileBookings;