import React from "react";
import { Outlet } from "react-router-dom";
import DbSiderbar from "./DbSidebar";

function DbLayout() {
  return (
    <>
      <div class="flex h-screen overflow-hidden font-roboto">
        <aside>
          <DbSiderbar />
        </aside>
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default DbLayout;
