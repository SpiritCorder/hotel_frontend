import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import {Alert, Table} from 'react-bootstrap';
import moment from 'moment';

const AllFoodOrders = () => {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getAllFoodOrders = async () => {
            try {
                const response = await axiosPrivate.get('/api/foods/order');
                console.log(response.data);
                setOrders(response.data.orders);
            } catch (err) {
                console.log(err);
            }
        }
        getAllFoodOrders();
    }, [axiosPrivate]);

    return (
        <>
            <div className='d-flex align-items-center justify-content-between'>
                <h1>All Food Orders</h1>
                <button className='btn btn-primary' onClick={() => navigate(-1)}>Go back</button>
            </div>
            <hr></hr>

            {orders.length > 0 ? (
                <Table>
                    <thead>
                        <tr>
                            <th>#Order ID</th>
                            <th>Customer ID</th>
                            <th>Order Price</th>
                            <th>Total Items Ordered</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.customerId}</td>
                                <td>${o.totalPrice}</td>
                                <td>{o.totalItems}</td>
                                <td>{moment(o.createdAt).utc().format('YYYY-MM-DD')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant='info'>No food orders available</Alert>
            )}
        </>
    );
}

export default AllFoodOrders;