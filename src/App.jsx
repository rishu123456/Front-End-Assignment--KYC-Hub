import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductDetails from './pages/ProductDetails';
import CompareProducts from './pages/CompareProducts';
import { CompareProvider } from './context/CompareContext';
import 'antd/dist/reset.css';

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <CompareProvider>
        <Layout className="min-h-screen">
          <Navbar />
          <Layout>
            <Sidebar />
            <Content className="bg-gray-50">
              <Routes>
                <Route path="/" element={<ProductDetails />} />
                <Route path="/compare" element={<CompareProducts />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </CompareProvider>
    </BrowserRouter>
  );
}

export default App;