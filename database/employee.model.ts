import { Schema, models, model, Document } from 'mongoose';

export interface IEmployee extends Document {
  employeeId: string;
  name: string;
  position: string;
  imageUrl: string;
}

const EmployeeSchema = new Schema({
  employeeId: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  
});

const Employee = models.Employee || model('Employee', EmployeeSchema);

export default Employee;