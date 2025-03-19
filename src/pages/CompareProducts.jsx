import React, { useState } from "react";
import { Button, Card, Modal, Table, Spin, Alert } from "antd";
import { Plus, X } from "lucide-react";
import { useCompareProducts } from "../context/CompareContext";
import { useProducts } from "../hooks/useProduct";

const CompareProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { compareProducts, addToCompare, removeFromCompare } = useCompareProducts();
  const { data: products, loading, error } = useProducts();

  const renderComparisonCard = (product) => (
    <Card
      key={product.id}
      className="flex-4 min-w-[250px]  items-center justify-center"
      cover={
        <img
          alt={product.title}
          src={product.images[0]}
          className="w-full h-48 sm:h-28 md:h-24 lg:h-20 object-contain"
        />
      }
    >
      <Button
        icon={<X size={16} />}
        className="absolute top-2 right-2"
        onClick={() => removeFromCompare(product.id)}
      />
      <h3 className="text-lg font-semibold mb-4">{product.title}</h3>
      <div className="space-y-2">
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <div>
          <strong>Tags:</strong>
          <ul className="list-disc pl-4 mt-1">
            {product.tags?.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Compare Products</h1>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => setIsModalOpen(true)}
          disabled={compareProducts.length >= 4}
        >
          Add More
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {compareProducts.length === 0 ? (
          <div className="w-full text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No products selected for comparison</p>
            <Button
              type="primary"
              className="mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Add Products
            </Button>
          </div>
        ) : (
          compareProducts.map(renderComparisonCard)
        )}
      </div>

      <Modal
        title="Add Products to Compare"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Spin size="large" />
          </div>
        ) : error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <Table
            dataSource={products}
            rowKey="id"
            columns={[
              {
                title: "Product",
                dataIndex: "title",
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
              },
              {
                title: "Price",
                dataIndex: "price",
                render: (price) => `$${price.toFixed(2)}`,
              },
              {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <Button
                    type="primary"
                    onClick={() => {
                      addToCompare(record);
                      setIsModalOpen(false);
                    }}
                    disabled={compareProducts.some((p) => p.id === record.id)}
                  >
                    Add
                  </Button>
                ),
              },
            ]}
            pagination={false}
          />
        )}
      </Modal>
    </div>
  );
};

export default CompareProducts;
