import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Create from "./Create.jsx";
import About from "./About.jsx";
import StreetfoodDetail from "./StreetfoodDetail.jsx";
import Edit from "./Edit.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/create",
                element: <Create/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/streetfoods/:id",
                element: <StreetfoodDetail/>,
            },
            {
                path: "/edit/:id",
                element: <Edit/>,
            },

        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
