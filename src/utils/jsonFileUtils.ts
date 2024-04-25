import * as fs from "fs";
import axios from "axios";
import { user } from "../types/user";
import { filePath } from "../../config/config";

export const fetchUserData = async() => {
    try {
        const jsonUserData: user[] = await getUserData();
        if (jsonUserData.length) {
            const response = await axios.get("https://dummyjson.com/users");
            const jsonResponseData: user[] = response.data.users;
            saveUserData(jsonResponseData);
        }
        console.log("Data added to File !!!!");
    } catch(error) {
        console.log("Failed to load data with error : ", error);
    }
};

export const getUserData = async() => {
    try {
        const userData: string  = fs.readFileSync(filePath, 'utf-8');
        const jsonUserData: user[] = JSON.parse(userData);
        return jsonUserData;
    } catch(error) {
        console.log("Failed to load data with error : ", error);
        return [];
    }
};

export const saveUserData = (userData: user[]) => {
    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
};