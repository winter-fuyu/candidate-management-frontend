import { Breadcrumb } from "antd";

const Layout: React.FC<{
  breadcrumbs: { title: React.ReactNode }[];
  children: React.ReactNode;
}> = ({ breadcrumbs, children }) => (
  <div className="bg-white m-5 p-4  shadow-2xl rounded-lg">
    <Breadcrumb className="text-gray-500 pb-3" items={breadcrumbs} />
    {children}
  </div>
);

export default Layout;
