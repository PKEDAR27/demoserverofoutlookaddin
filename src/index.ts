import express, { Response, Request } from "express";
import authRoutes from "./routes/authRoutes";
import userRouters from "./routes/userRoutes";
import { fetchUserData } from "./utils/jsonFileUtils";


const cors = require('cors');

fetchUserData();

const serverApp = express();
serverApp.use(express.json());

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
serverApp.use(cors(corsOptions));

serverApp.use("/api/auth", authRoutes);
serverApp.use("/", userRouters);


const PORT = process.env.PORT || 9001
serverApp.listen(PORT, () => {
    console.log(" Server is running on port : ", PORT);
});