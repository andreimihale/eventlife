import * as React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-center bg-primary-50 bg-dotted-pattern min-h-screen w-full bg-cover bg-fixed bg-center">
      {children}
    </main>
  );
};

export default Layout;
