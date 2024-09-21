import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className=" bg-transparent flex min-h-screen w-full">
      
      <div className="bg-gradient-to-r from-orange-500 to-slate-900 ... flex flex-1 items-center justify-center bg-background  px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;