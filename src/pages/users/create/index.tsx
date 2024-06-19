import React, { useState } from "react";
import Layout from "../../../layout/body.layout";
import { Button, Form, Input, Spin, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation } from "@tanstack/react-query";
import { create_user } from "../../../services/users/mutations";
import { UserCreateDto } from "../../../services/users/types";
import { useNavigate } from "react-router-dom";

const UserCreate: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const createMutation = useMutation({
    mutationFn: (dto: UserCreateDto) => {
      return create_user(dto);
    },
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("User information updated successfully!");
      navigate("/");
    },
  });
  const onFinish = async (values: UserCreateDto) => {
    setLoading(true);
    await createMutation.mutateAsync(values);
    setLoading(false);
  };
  return (
    <Layout
      breadcrumbs={[{ title: <a href="/">User List</a> }, { title: "Create" }]}
    >
      <Spin size="large" spinning={loading}>
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
              Add
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Layout>
  );
};

export default UserCreate;
