"use server"

import Employee from "@/database/employee.model";
import { connectToDatabase } from "../mongoose";

export async function getemployees(params: any) {
    try {
        connectToDatabase();
        

        const employees = await Employee.find({})
            .sort({ createdAt: -1 });
        return {employees};

      

    } catch (error) {
        console.log(error);
        throw error;
    }
}
