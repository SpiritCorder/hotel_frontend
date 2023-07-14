import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import EventOrderItem from './components/EventOrderItem';
import {Alert} from 'react-bootstrap';

const AllEventOrders = () => {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getAllEventOrders = async () => {
            try {
                const response = await axiosPrivate.get('/api/events/order');
                console.log(response.data);
                setOrders(response.data.orders);
            } catch (err) {
                console.log(err);
            }
        }
        getAllEventOrders();
    }, [axiosPrivate]);

    return (
        <>
            <div className='d-flex align-items-center justify-content-between'>
                <h1>All Event Orders</h1>
                <button className='btn btn-primary' onClick={() => navigate(-1)}>Go Back</button>
            </div>
            <hr></hr>

            {orders.length > 0 ? (
                orders.map(o => (<EventOrderItem key={o.id} order={o} customer={o.customerDetails}/>))
            ) : (
                <Alert variant='info'>No event orders</Alert>
            )}
        </>
    );
}

export default AllEventOrders;