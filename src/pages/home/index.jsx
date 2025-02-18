import React, { useEffect, useState } from "react";
import Header from "../../component/header";
import { Popconfirm, Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProducts } from "../../store/slices/ProductSlice";
import { fetchCustomers, deleteCustomer } from "../../store/slices/CustomerSlice";
import { MdDeleteOutline } from "react-icons/md";
import { Button, message, Space } from 'antd';




const HomeScreen = () => {
    const dispatch = useDispatch();
    const [currentDelete, setCurrentDelete] = useState()
    const [currentCustomerDelete, setCurrentCustomerDelete] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    const { products, loadingProduct, loadingDelete, errorDelete, errorProduct } = useSelector((state) => state.products);
    const { customers, loadingCustomer, loadingDeleteCustomer, errorCustomer, errorDeleteCustomer } = useSelector((state) => state.customers);


    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCustomers());
    }, []);


    useEffect(() => {
        const errors = [
            { type: "error", content: errorDelete },
            { type: "error", content: errorProduct },
            { type: "error", content: errorCustomer },
            { type: "error", content: errorDeleteCustomer },
        ];
        errors.forEach(({ type, content }) => {
            if (content) {
                messageApi.open({ type, content });
            }
        });
    }, [errorDelete, errorProduct, errorCustomer, errorDeleteCustomer]);


    const DeleteProductFunc = (id) => {
        setCurrentDelete(id)
        dispatch(deleteProducts(id));
    }

    const DeleteCustomerFunc = (id) => {
        setCurrentCustomerDelete(id)
        dispatch(deleteCustomer(id));
    }

    const productColumn = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width:100,
        },
        {
            title: 'Picture',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) =>
                <img src={text} className="h-12 w-12 rounded-full" />,
            width:100,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width:100,
        },
        {
            title: 'Create at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => {
                const date = new Date(text);
                return (
                    <h6 className="h-12 rounded-full">{date?.toLocaleDateString()}</h6>
                )
            },
            width:100,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => {
                return (
                    <h6 className="h-12 rounded-full">{`$${text}`}</h6>
                )
            },
            width:100,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            width:100,
        },

        {
            title: 'Delete',
            dataIndex: 'id',
            key: 'id',
            align: 'right',
            render: (text) => {
                return (
                    <Popconfirm
                        title="Delete the Product"
                        description="Are you sure to delete this Product?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => DeleteProductFunc(text)}
                        disabled={loadingDelete}
                    >
                        {loadingDelete && currentDelete == text ? <Spin /> :
                            <button><MdDeleteOutline color="red" size={30} /></button>
                        }
                    </Popconfirm>
                )
            },
            width:100,
        },
    ];
    const customerColumn = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width:100,
        },
        {
            title: 'Picture',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) =>
                <img src={text} className="h-12 w-12 rounded-full" />,
            width:100,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width:100,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
            width:100,
        },
        {
            title: 'Date of birth',
            dataIndex: 'dob',
            key: 'dob',
            render: (text) => {
                const date = new Date(text);
                return (
                    <h6 className="h-12 rounded-full">{date?.toLocaleDateString()}</h6>
                )
            },
            width:100,

        },

        {
            title: 'Delete',
            dataIndex: 'id',
            key: 'id',
            align: 'right',
            render: (text) => {
                return (
                    <Popconfirm
                        title="Delete the Customer"
                        description="Are you sure to delete this Customer?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => DeleteCustomerFunc(text)}
                        disabled={loadingDeleteCustomer}
                    >
                        {loadingDeleteCustomer && currentCustomerDelete == text ? <Spin /> :
                            <button><MdDeleteOutline color="red" size={30} /></button>
                        }
                    </Popconfirm>
                )
            },
            width:100,
        },
    ];

    return (
        <>
            {contextHolder}
            <Header />
            <div className="container mx-auto px-4 pt-12">
                <div className="pt-4">
                    <h1 className="text-4xl font-bold">Products</h1>
                    <div className="pt-8 overflow-auto">
                        <Table loading={loadingProduct} dataSource={products} columns={productColumn} />
                    </div>
                </div>
                <div className="pt-4">
                    <h1 className="text-4xl font-bold">Customers</h1>
                    <div className="pt-8 overflow-auto">
                        <Table loading={loadingCustomer} dataSource={customers} columns={customerColumn} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeScreen;