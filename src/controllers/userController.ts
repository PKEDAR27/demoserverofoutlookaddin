import { Request, Response } from "express";
import { getUserData, saveUserData } from "../utils/jsonFileUtils";
import { user } from "../types/user";

export const getUsers = async (request: Request, response: Response) => {
  try {
    const usersList: user[] = await getUserData();
    response.json(usersList);
  } catch (error) {
    console.log("Failed to get users with error : ", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const newUser: user = request.body;
    const usersList: user[] = await getUserData();
    console.log("Data", newUser)
    // saveUserData({...usersList, ...newUser});
    response.json({
      message: "Metting Data",
      data: newUser,
    });
  } catch (error) {
    console.log("Failed to create user with error : ", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (request: Request, response: Response) => {
  try {
    const userId: number = parseInt(request.params.id);
    const usersList: user[] = await getUserData();
    const updatedUser = request.body;
    const index = usersList.findIndex((user) => user.id === userId);
    if (index !== -1) {
      usersList[index] = { ...usersList[index], ...updatedUser };
      saveUserData(usersList);
      response.json({
        message: "User Updeted Successfully",
        user: usersList[index],
      });
    } else {
      response.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log("Failed to update user with error : ", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (request: Request, response: Response) => {
  try {
    const userId: number = parseInt(request.params.id);
    let usersList: user[] = await getUserData();
    const index = usersList.findIndex((user) => user.id === userId);
    usersList = usersList.filter((user) => user.id !== userId);
    saveUserData(usersList);
    if(index !== -1) {
      saveUserData(usersList);response.json({
        message: "User deleted Successfully"
      });
    } else {
      response.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log("Failed to delete user with error : ", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};
