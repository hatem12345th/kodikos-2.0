import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Providers } from "./routes/providers";

export default function App() {

    

  return (
                    
    <Providers>
        <RouterProvider router={router} />
      </Providers>
    
  )
}