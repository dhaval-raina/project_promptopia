import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import { ToastContainer } from 'react-toastify';
export const metadata = {
  title: "Promptopia",
  description: "Discover and share AP Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        {/* <ToastContainer /> */}
      </body>
    </html>
  )
}

export default RootLayout;
