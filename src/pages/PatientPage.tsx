import {
  EyeInvisibleOutlined,
  MoreOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Button,
  DatePicker,
  Dropdown,
  Input,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  Ambulance,
  Bed,
  History,
  Home,
  ListFilter,
  Stethoscope,
  User,
} from "lucide-react";
import { useState } from "react";
import excel from "../assets/excel.svg";
import { data, statusOptions } from "../data/data";
import { DataType } from "../interface/types";
import StatsCard from "./partials/StatsCard";

const { RangePicker } = DatePicker;

export default function PatientPage() {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "View Details",
    },
    {
      key: "2",
      label: "Edit",
    },
    {
      key: "3",
      label: "Delete",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "number",
      width: 70,
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Patient Name",
      dataIndex: "name",
    },
    {
      title: "Age/Gender",
      dataIndex: "ageGender",
      width: 100,
    },
    {
      title: "Date & Time",
      dataIndex: "datetime",
      width: 170,
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
    },
    {
      title: "Queue No.",
      dataIndex: "queueNo",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: DataType["status"]) => {
        let color = "";
        switch (status) {
          case "New":
            color = "orange";
            break;
          case "Follow Up":
            color = "blue";
            break;
          case "Free":
            color = "green";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "",
      key: "action",
      width: 60,
      render: () => (
        <Dropdown
          overlayClassName="z-50"
          placement="bottomLeft"
          menu={{ items }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0].value);
  const [perpage, setPerpage] = useState(3);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="">
        <Breadcrumb
          items={[
            { title: <Home size={19} />, href: "/" },
            { title: "Clinical Management" },
            { title: "OPD" },
            { title: "New Patients" },
          ]}
        />
      </div>

      
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-y-4">
        <Space>
          <Stethoscope size={24} />
          <h1 className="font-semibold text-2xl">OPD Department</h1>
          <Button icon={<ListFilter />}>Filter</Button>
          <Button icon={<ReloadOutlined />} />
        </Space>
        <Space>
          <Button icon={<EyeInvisibleOutlined />}>Hide Filter</Button>
          <Button icon={<img src={excel} />}>Download Excel</Button>
        </Space>
      </div>

      
      <div>
        <h3 className="pb-2">Filters:</h3>
        <div className="gap-4 grid md:grid-cols-3 text-lightDark">
          <div>
            <p className="mb-2 text-sm">Period:</p>
            <RangePicker className="w-full" />
          </div>
          <div>
            <p className="mb-2 text-sm">Filter Via Doctor:</p>
            <Select
              placeholder="Select Doctor Name"
              className="w-full"
              options={[{ value: "all", label: "All Doctors" }]}
            />
          </div>
        </div>
      </div>

      
      <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <StatsCard title="New Patients" icon={User} value={"20"} />
        <StatsCard title="Average Wait Time" icon={History} value="25 min" />
        <StatsCard
          title="Patients in Queue"
          icon={Bed}
          value={"10"}
          extra={{ label: "Queue No", value: "11-20" }}
        />
        <StatsCard title="Cancellations" value={"2"} />
        <StatsCard
          title="Urgent Cases"
          icon={Ambulance}
          value={"10"}
          extra={{ label: "Queue No", value: "11-20" }}
        />
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 mt-4">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            type={selectedStatus === option.value ? "primary" : "default"}
            onClick={() => setSelectedStatus(option.value)}
          >
            {option.label} <span className="font-medium">({option.count})</span>
          </Button>
        ))}
      </div>

      
      <div className="flex justify-between items-center">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search for modules, submodules, settings, etc"
          style={{ width: 400 }}
        />
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Show</span>
          <Select
            value={perpage.toString()}
            onChange={(value) => setPerpage(Number(value))}
            style={{ width: 70 }}
            options={[
              { value: "3", label: "3" },
              { value: "5", label: "5" },
              { value: "10", label: "10" },
            ]}
          />
        </div>
      </div>

      
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: true }}
        pagination={{
          pageSize: perpage,
          showTotal: (total, range) =>
            ` ${range[0]} to ${range[1]} of ${total} entries`,
        }}
        size="middle"
        bordered
      />
    </div>
  );
}
