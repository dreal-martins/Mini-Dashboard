import { ColumnDef } from "@tanstack/react-table";
import CustomTable from "..";
import { IUsers } from "../../../interfaces";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { EyeOutlined, MenuOutlined } from "@ant-design/icons";

interface Props {
  data: IUsers[];
}

export default function UsersTable({ data }: Props) {
  const columns: ColumnDef<IUsers>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: "Username",
      accessorKey: "username",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: "Address",
      accessorKey: "address",
      cell: (info) => {
        const address = info.row.original.address;
        return (
          <span>
            {address.suite}, {address.street}, {address.city}
          </span>
        );
      },
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: "Website",
      accessorKey: "website",
      cell: (info) => {
        return <span>{info.getValue() as string}</span>;
      },
    },
    {
      header: "Company",
      accessorKey: "company",
      cell: (info) => {
        const company = info.row.original.company;
        return <span>{company.name}</span>;
      },
    },
    {
      header: "",
      accessorKey: "actions",
      cell: (info) => {
        const rowId = info.row.original.id;

        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <div className="flex gap-2 hover:text-red-500 w-full">
                <Link
                  to={`/users/${rowId}`}
                  className="hover:text-red-500 w-full"
                >
                  <EyeOutlined /> View User
                </Link>
              </div>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button>
              <MenuOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return <CustomTable<IUsers> columns={columns} initialData={data} />;
}
