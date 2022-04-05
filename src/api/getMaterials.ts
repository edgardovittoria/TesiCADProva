import axios from "axios";

export async function getMaterials(){
    try {
        const response = await axios.get('http://localhost:3001/materials');
        return response.data
    }catch (e) {
        console.log(e)
        return [];
    }
}