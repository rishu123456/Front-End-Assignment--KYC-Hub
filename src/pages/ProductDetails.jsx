import React from "react";
import { Table, Button, message, Spin, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useCompareProducts } from "../context/CompareContext";
import { useProducts } from "../hooks/useProduct";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { compareProducts, addToCompare } = useCompareProducts();
  const { data: products, loading, error } = useProducts();

  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <div className="flex items-center gap-4">
          <img
            src={record.thumbnail}
            alt={text}
            className="w-12 h-12 object-cover rounded"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: [
        { text: "Beauty", value: "beauty" },
        { text: "Fragrances", value: "fragrances" },
        { text: "Furniture", value: "furniture" },
        { text: "groceries", value: "groceries" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => <span className="line-clamp-2">{text}</span>,
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      render: (discount) => `${discount}%`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          disabled={compareProducts.some((p) => p.id === record.id)}
          onClick={() => handleCompare(record)}
        >
          {compareProducts.some((p) => p.id === record.id)
            ? "Added to Compare"
            : "Compare"}
        </Button>
      ),
    },
  ];

  const handleCompare = (product) => {
    if (compareProducts.length >= 4) {
      message.warning("You can compare up to 4 products at a time");
      return;
    }
    addToCompare(product);
    message.success("Product added to comparison");
    navigate("/compare");
  };

  const productsWithCompare = products
    ? products.map((product) => ({
        ...product,
        isCompared: compareProducts.some((p) => p.id === product.id),
      }))
    : [];

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spin size="large" />
        </div>
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon />
      ) : (
        <Table
          columns={columns}
          dataSource={productsWithCompare}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      )}
    </div>
  );
};

export default ProductDetails;
