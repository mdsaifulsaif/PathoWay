// import React from "react";

// function router() {
//   return <div>routes</div>;
// }

// export default router;

import { createBrowserRouter, RouterProvider } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
]);
