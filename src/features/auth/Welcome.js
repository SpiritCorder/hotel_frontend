import {useState, useEffect, Suspense} from 'react';
import {useSelector} from 'react-redux';
import {selectAuthUser} from '../../app/auth/authSlice';
import moment from 'moment';

import '../../styles/welcome.css';
import PopularFoodCategory from '../../components/charts/PopularFoodCategory';
import BookingsMonthlyReport from '../../components/charts/BookingsMonthlyReport';
import DashboardCard from '../../components/DashboardCard';

const Welcome = () => {

    const user = useSelector(selectAuthUser);

    const [timestamp, setTimestamp] = useState(moment().format('LTS'));

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimestamp(moment().format('LTS'));
        }, 1000)

        return () => clearInterval(timerId);
    }, []);

    return (
        <div>
            <div className="dashboard-welcome-box">
                <h1>Welcome, <span>{user.username}</span></h1>
                <h6>{moment().format('MMMM Do YYYY')} , {moment().format('dddd')}</h6>
                <p className='welcome-box-current-time'>{timestamp}</p>
                <div className='welcome-box-img'>
                    <img src='/img/welcome.png' alt='welcome' />
                </div>
            </div>

            {user && user.role === 'Customer' && (
                <div className='my-5'>
                    <div className='d-flex flex-wrap justify-content-between'>
                        <DashboardCard
                            title="Book your room today"
                            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
                            url="/images/dash_room.jpg"
                            link="/dash/rooms"
                        />
                        <DashboardCard
                            title="Rent A vehicle!"
                            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has surviv"
                            url="/images/dash_rental.jpg"
                            link="/dash/vehicle-rental"
                        />
                        <DashboardCard
                            title="Order some foods!"
                            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been "
                            url="/images/dash_food.jpg"
                            link="/dash/food-reservation"
                        />
                        <DashboardCard
                            title="Join some events!"
                            text="Lorem Ipsum is  unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
                            url="/images/dash_event.jpg"
                            link="/dash/events"
                        />
                    </div>
                </div>
            )}

            {/* Reports Charts  */}
            {user && (user.role === 'Admin' || user.role === 'Employee') && (
                <>
                    <Suspense fallback={<p>Loading...</p>}>
                        <PopularFoodCategory />
                    </Suspense>
                    <Suspense fallback={<p>Loading...</p>}>
                        <BookingsMonthlyReport />
                    </Suspense>
                </>
            )}
            
            
        </div>
    );
}

export default Welcome;