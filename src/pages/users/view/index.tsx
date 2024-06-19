import React from "react";
import Layout from "../../../layout/body.layout";
import { Card, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import { get_user_by_id } from "../../../services/users/query";
import { useQuery } from "@tanstack/react-query";

const UserView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isPending, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => get_user_by_id(id ?? "error"),
    retry: 0,
  });
  if (!id || error) {
    message.error(`${error ? error.message : "Invalid Id!"}`, 10000);
    return <></>;
  }
  return (
    <Layout
      breadcrumbs={[{ title: <a href="/">User List</a> }, { title: "View" }]}
    >
      {isPending ? (
        <Spin size="large" />
      ) : (
        <Card title="Details" bordered={false} className="shadow-lg p-4">
          {data ? (
            <div>
              <p>
                <strong>First Name:</strong> {data.data.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {data.data.lastName}
              </p>
              <p>
                <strong>Email:</strong> {data.data.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {data.data.phoneNumber}
              </p>
              <p>
                <strong>Best Time to Call:</strong> {data.data.callTimeInterval}
              </p>
              <p>
                <strong>LinkedIn URL:</strong>{" "}
                <a
                  href={data.data.linkedinUrl ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.data.linkedinUrl}
                </a>
              </p>
              <p>
                <strong>GitHub URL:</strong>{" "}
                <a
                  href={data.data.githubUrl ?? ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.data.githubUrl}
                </a>
              </p>
              <p>
                <strong>Comment:</strong> {data.data.comment}
              </p>
            </div>
          ) : (
            <p>No user data found.</p>
          )}
        </Card>
      )}
    </Layout>
  );
};

export default UserView;
