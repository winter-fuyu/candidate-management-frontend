import React, { useState } from "react";
import { Button, Dropdown, Input, Space, Table, message } from "antd";
import type { TableColumnsType } from "antd";
import { User } from "../../../services/users/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get_users } from "../../../services/users/query";
import Layout from "../../../layout/body.layout";
import { useNavigate } from "react-router-dom";
import { remove_user_by_id } from "../../../services/users/mutations";
import useDebounce from "../../../hooks/usedebounce.hook";

const UserList: React.FC = () => {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const navigate = useNavigate();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["users", skip, debouncedSearch],
    queryFn: () => get_users(debouncedSearch, skip),
    retry: 0,
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return remove_user_by_id(id);
    },
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("User deleted successfully");
      setSkip(0);
      refetch();
    },
  });
  if (error) {
    message.error("Error! Message:" + error.message, 10000);
    return <div></div>;
  }

  const columns: TableColumnsType<User> = [
    {
      title: "First Name",
      key: "firstName",
      dataIndex: "firstName",
      width: 100,
    },
    {
      title: "Last Name",
      key: "lastName",
      dataIndex: "lastName",
      width: 100,
    },
    {
      title: "Phone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      width: 150,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Call Time Interval",
      key: "callTimeInterval",
      dataIndex: "callTimeInterval",
      width: 150,
    },
    {
      title: "Linkedin",
      key: "linkedinUrl",
      dataIndex: "linkedinUrl",
      width: 150,
    },
    {
      title: "Github",
      key: "githubUrl",
      dataIndex: "githubUrl",
      width: 150,
    },
    {
      title: "Comment",
      key: "comment",
      dataIndex: "comment",
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (value: User) => {
        const items = [
          {
            key: "1",
            label: "View",
            onClick: () => {
              navigate(`/${value.id}`);
            },
          },
          {
            key: "2",
            label: "Update",

            onClick: () => {
              navigate(`/update/${value.id}`);
            },
          },
          {
            key: "3",
            label: "Delete",
            onClick: () => {
              deleteMutation.mutate(value.id);
            },
          },
        ];
        return (
          <Space size="middle">
            <Dropdown menu={{ items }}>
              <div className="text-blue-500">options</div>
            </Dropdown>
          </Space>
        );
      },
    },
  ];
  return (
    <Layout breadcrumbs={[{ title: "User List" }]}>
      <div className="flex justify-end gap-2">
        <Input
          className="mb-2 w-40"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to search..."
        />
        <Button type="primary" onClick={() => navigate("/new")}>
          Add
        </Button>
      </div>

      <Table
        columns={columns}
        loading={isPending}
        dataSource={data?.data.results}
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Total ${total} items`,
          total: data?.data.total ?? 0,
          current: skip / 10 + 1,
          onChange: (page) => setSkip((page - 1) * 10),
        }}
        scroll={{ y: "calc(100vh - 200px)" }}
        className="h-full"
      />
    </Layout>
  );
};

export default UserList;
