import React, { useState } from "react";
import Layout from "../../../layout/body.layout";
import { Button, Form, Input, Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UserCreateDto } from "../../../services/users/types";
import { update_user } from "../../../services/users/mutations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get_user_by_id } from "../../../services/users/query";
import TextArea from "antd/es/input/TextArea";

const UserUpdate: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { isPending, error } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await get_user_by_id(id ?? "error");
      form.setFieldsValue(response.data);
      return response;
    },
    retry: 0,
  });

  const updateMutation = useMutation({
    mutationFn: (dto: UserCreateDto) => {
      return update_user(dto, id as string);
    },
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("User information updated successfully!");
      navigate("/");
    },
  });
  if (!id || error) {
    message.error(`${error ? error.message : "Invalid Id!"}`, 10000);
    return <></>;
  }
  const onFinish = async (values: UserCreateDto) => {
    setLoading(true);
    await updateMutation.mutateAsync(values);
    setLoading(false);
  };
  return (
    <Layout
      breadcrumbs={[{ title: <a href="/">User List</a> }, { title: "Update" }]}
    >
      <Spin size="large" spinning={loading || isPending}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item
            name="callTimeInterval"
            label="Best Time to Call"
            rules={[{ required: true, message: "Please enter the best time" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="linkedinUrl" label="LinkedIn URL">
            <Input />
          </Form.Item>
          <Form.Item name="githubUrl" label="GitHub URL">
            <Input />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: true, message: "Please enter a comment" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Layout>
  );
};

export default UserUpdate;
