export interface DataType {
  key: string;
  number: number;
  id: string;
  name: string;
  ageGender: string;
  datetime: string;
  department: string;
  doctor: string;
  queueNo: string;
  status: "New" | "Follow Up" | "Free";
}
