import React from "react";

interface Props {
  left?: JSX.Element;
  children?: any;
}

const Layout: React.FC<Props> = (children) => {
  return (
    <div className="row">
      <div className="col-md-3 m-0 p-0">{children.left}</div>
      <div className="col-md-9 m-0">{children.children}</div>
    </div>
  );
};

export default Layout;
