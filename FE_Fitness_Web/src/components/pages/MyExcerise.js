import React, { useState, useEffect, useContext } from 'react';
// , { useState, useEffect, useContext }
import { Layout, Menu, Avatar, Button, Table, DatePicker, notification } from 'antd';
import { UserOutlined, CalendarOutlined, LogoutOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { DateContext } from './DateContext';
import '../../styles/pages/MyExcerise.css';

import { Checkbox } from 'antd';
import remove from '../../images/Delete.svg';
import edit from '../../images/Edit.svg';
//Layout

//Modal
const MyExcerise = () => {
    const [calendar, setCalendar] = useState(new Date().toISOString().split('T')[0]);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [exerciseID, setExerciseid] = useState('');
    const [time, setTime] = useState('1');
    const [weight, setYourweight] = useState('1');
    const [exerciseData, setExerciseData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [exerciseDetails, setExerciseDetails] = useState([]);
    const [status, setStatus] = useState([null])
    // const { setSelectedDate } = useContext(DateContext);
    // Toggle Modal 
    const toggleModal1 = () => {
        setModal1(!modal1);
        setModal2(false);
    };

    // Toggle Modal 2
    const toggleModal2 = (event) => {
        setModal2(!modal2);
        setModal1(false);
        const exceriseValue = event.target.getAttribute('data-value');
        setExerciseid(exceriseValue);
        console.log(`Value of excersise: ${exceriseValue}`);
    };

    const toggleModal3 = (event) => {
        setModal2(!modal2);
        setModal1(false);
    };

    const toggleModal4 = () => {
        setModal4(!modal4);
    };
    const handleChooseButtonClick = (event) => {
        toggleModal2(event);
    };
    const handleTimeinput = (event) => {
        const timeInput = event.target.value;
        setTime(timeInput);
        console.log(`User enter time: ${timeInput}`);
    };
    const handleWeightinput = (event) => {
        const weightInput = event.target.value;
        setYourweight(weightInput);
        console.log(`User enter weight: ${weightInput}`);
    };
    const handleStatusinput = (event) => {
        const statusInput = event.target.value;
        setStatus(statusInput);
        console.log(`User enter status: ${statusInput}`);
    };
    if (modal1 || modal2) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    const handleAddandGetExercise = async () => {
        await handleAddExercise();
        await handleGetExercise(calendar); // Thay `date` bằng giá trị ngày cần truyền
    };

    useEffect(() => {
        console.log("add new calendar for new date: ", calendar);
        handleAddcalendar(calendar);
        handleGetExercise(calendar);
    }, [calendar]);

    // useEffect(() => {
    //     handleEdit(exerciseID);
    // }, [status]);

    const handleAddcalendar = async (date) => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            console.log({ 'We are running in handleAddCaledar ': date });
            const diaryresponse = await fetch(`http://localhost:3000/api/diaries`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date }),
            });

            const userData = await diaryresponse.json();
            console.log('ex details: ', userData);
            if (!userData || !userData.exercise) {
                setExerciseData([]);
                return;
            }
            const exerciseData = [];
        } catch (err) {
            console.error('Error during diary addition process:', err);
        }
    };

    const handleDateChange = (date) => {
        if (!date) {
            console.error("No date selected");
            return;
        }
        // Add one day
        const previousDay = new Date(date);
        previousDay.setDate(previousDay.getDate() + 1);

        const formattedDate = previousDay.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        console.log(formattedDate);
        //setSelectedDate(formattedDate);
        setCalendar(formattedDate); // Update the calendar state
        handleAddcalendar(formattedDate); // Pass the adjusted date to handleAddcalendar
    };


    const handleAddExercise = async () => {
        try {
            const date = calendar;
            console.log("date:", date);
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await fetch('http://localhost:3000/api/exercises', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exerciseID, date, time, weight }),
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('Exercise details: ', userData);
                setTimeout(() => setModal2(false), 500);
            } else {
                console.error('Error adding exercise:', await response.json());
            }

        } catch (err) {
            console.error('Error during exercise addition process:', err);
        }
    };


    const handleGetExercise = async (date) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const userResponse = await fetch(`http://localhost:3000/api/exercises?date=${encodeURIComponent(date)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                console.log('User data:', userData);

                if (userData) {
                    const mappedData = userData.map((exercise) => ({
                        key: exercise.exercise_id, // Use exercise_id as the key
                        name: exercise.exercise.name,
                        time: exercise.time,
                        calories_burned: exercise.calories_burned,
                        weight: exercise.weight,
                    }));
                    setExerciseData(mappedData);

                } else {
                    console.error('Exercise fitness data is missing in the response:', userData);
                }
            } else {
                console.error('Error fetching user data:', await userResponse.json());
            }
        } catch (err) {
            console.error('Error during exercise fetching process:', err);
        }
    };

    useEffect(() => {
        if (exerciseID && modal2) {
            handleShowexercise();
        }
    }, [exerciseID, modal2]);
    const handleShowexercise = async () => {
        try {
            const token = localStorage.getItem('token');
            const userResponse = await fetch(`http://localhost:3000/api/exercises/details/${exerciseID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                console.log('Exercise data:', userData);

                if (userData) {
                    const exercise = {
                        key: userData.exercise_id,
                        name: userData.name,
                        met: userData.met,
                    };
                    setExerciseDetails(exercise); // Cập nhật trạng thái
                } else {
                    console.error('Exercise data is missing in the response:', userData);
                }
            } else {
                console.error('Error fetching exercise data:', await userResponse.json());
            }
        } catch (err) {
            console.error('Error during fetching exercise process:', err);
        }
    };

    const handleEdit = async (id) => {
        if (!id) {
            console.error("Cannot edit exercise: Exercise ID is undefined.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const date = calendar; // Ngày lấy từ DatePicker
            console.log("date", date);
            console.log(`Editing exercise with id: ${id}`);

            const response = await fetch(`http://localhost:3000/api/exercises/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, time, weight, status }), // Dữ liệu cập nhật
            });

            if (response.ok) {
                const userResponse = await fetch(`http://localhost:3000/api/exercises?date=${encodeURIComponent(date)}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    console.log('User data:', userData);

                    if (userData && Array.isArray(userData)) {
                        // Cập nhật bảng với dữ liệu mới
                        setExerciseData(userData.map((exercise) => ({
                            key: exercise.exercise_id,
                            name: exercise.exercise.name,
                            time: exercise.time,
                            weight: exercise.weight,
                            calories_burned: exercise.calories_burned,
                            status: exercise.status,
                        })));

                        notification.success({
                            message: 'Success',
                            description: 'Exercise updated successfully!',
                        });

                        // Đóng modal sau khi hoàn thành
                        setTimeout(() => setModal4(false), 500);
                    }
                } else {
                    console.error('Error fetching updated user data:', await userResponse.json());
                }
            } else {
                console.error('Error editing exercise:', await response.json());
            }
        } catch (err) {
            console.error('Error during exercise update process:', err);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const date = calendar;
            console.log("date", date)
            console.log(`Deleting food with exId: ${id}`);
            const response = await fetch(`http://localhost:3000/api/exercises/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                throw new Error(errorData.message || 'Failed to delete exercise from table');
            }
            // Update the UI by removing the item with the matching foodId from the correct state array.

            setExerciseData((prevData) => prevData.filter((item) => item.key != id));

            // Show a success notification.
            notification.success({
                message: 'Success',
                description: 'Exercise deleted successfully!',
            });
        } catch (error) {
            // Show an error notification.
            notification.error({
                message: 'Error',
                description: error.message || 'An error occurred while deleting the exercise.',
            });
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Time (minutes)', dataIndex: 'time', key: 'time' },
        { title: 'Calories burned', dataIndex: 'calories_burned', key: 'calories_burned' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: '',
            key: 'actions',
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <img
                        src={edit}
                        alt="Edit"
                        style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                        onClick={() => {
                            if (record?.key) {
                                setSelectedRecord(record);
                                toggleModal4();
                            } else {
                                console.error("Cannot edit exercise: Record key is undefined.");
                            }
                        }}
                    />
                    <img
                        src={remove}
                        alt="Delete"
                        style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                        // Uncomment to enable deletion
                        onClick={() => handleDelete(record.key)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className='myexcersise'>
            <div className='control'>
                <h1 className="excersise-title">My Excersise</h1>
                <Button onClick={toggleModal1} className='btn-modal' classtype="primary" Open>+ Add new excerise</Button>
                {/* Notification when click add new excersise */}
                {modal1 && (<div className='modal1'>
                    <div onClick={toggleModal1} className="overlay"></div>
                    <div className='modal-content1'>
                        <h2 className='modal1-title'>Choose your excersise</h2>
                        <div className='excersise-container'>
                            <span>Yoga</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="1" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <div className='excersise-container'>
                            <span>Running</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="2" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <div className='excersise-container'>
                            <span>Billiards</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="3" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <div className='excersise-container'>
                            <span>Boxing</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="4" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <div className='excersise-container'>
                            <span>Aerobic</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="5" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <div className='excersise-container'>
                            <span>Canoeing</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="6" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <div className='excersise-container'>
                            <span>Basketball</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="7" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <div className='excersise-container'>
                            <span>Volleyball</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="8" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <div className='excersise-container'>
                            <span>Cycling</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="9" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <div className='excersise-container'>
                            <span>Baseball</span>
                            <button onClick={(event) => handleChooseButtonClick(event)} data-value="10" className='choose-button' classtype="primary">Choose</button>
                        </div>
                        <Button className='close-button'
                            onClick={toggleModal1} >X</Button>
                    </div>
                </div>)}
                {/* Notification when click show excerisse details*/}
                {modal2 && (<div className='modal2'>
                    <div onClick={toggleModal2} className="overlay"></div>
                    <div className='modal-content2'>
                        <h2 className='modal2-title'>How many calories do you want to burn?</h2>
                        <div className='excersise_name'>
                            <span>Excersise </span>
                            <span>{exerciseDetails ? exerciseDetails.name : 'Loading...'}</span>
                        </div>
                        <div className='time'>
                            <span>Time</span>
                            <input type="number" id="time-input" name="time-input" min="1" placeholder='1 minutes' onChange={(event) => handleTimeinput(event)} />
                        </div>
                        <div className='your_weight'>
                            <span>Your weight</span>
                            <input type="number" id="weight-input" name="weight-input" min="1" placeholder='50 kg' onChange={(event) => handleWeightinput(event)} />
                        </div>
                        <div className='calories_burned'>
                            <span>Calorie burned </span>
                            <span>{exerciseDetails ? exerciseDetails.met : 0} kcal </span>
                        </div>
                        <Button onClick={handleAddandGetExercise} className='add-button' classtype="primary">Add to my excersise</Button>
                        <Button className='close-button' classtype="secondary"
                            onClick={toggleModal3} >X</Button>
                    </div>
                </div>)}
                {/* Notification when click edit excerisse details */}
                {modal4 && selectedRecord && (<div className='modal2'>
                    <div onClick={toggleModal4} className="overlay"></div>
                    <div className='modal-content2'>
                        <h2>Exercise details</h2>
                        <div className='excersise_name'>
                            <span>Excersise </span>
                            <span>{exerciseDetails ? exerciseDetails.name : 'Loading...'}</span>
                        </div>
                        <div className='time'>
                            <span>Time</span>
                            <input type="number" id="time-input" name="time-input" min="1" placeholder='1 minutes' onChange={(event) => handleTimeinput(event)} />
                        </div>
                        <div className='your_weight'>
                            <span>Your weight</span>
                            <input type="number" id="weight-input" name="weight-input" min="1" placeholder='50 kg' onChange={(event) => handleWeightinput(event)} />
                        </div>
                        <div className='calories_burned'>
                            <span>Calorie burned </span>
                            <span>{exerciseDetails ? exerciseDetails.met : 0} kcal </span>
                        </div>
                        <div className='status'>
                            <span>Status </span>
                            <select onChange={(event) => handleStatusinput(event)}>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Complete">Complete</option>
                            </select>
                        </div>
                        <div className='control_modal4'>
                            <Button onClick={toggleModal4} className='cancel-button'  ><span >Discard</span></Button>
                            <Button onClick={() => handleEdit(selectedRecord?.key)} className='save-button' classtype="primary">Save</Button>
                        </div>
                        <Button onClick={toggleModal4} className='close-button'  >X</Button>
                    </div>
                </div>)}
            </div>
            <DatePicker onChange={handleDateChange} className='calendar' />
            <div className='table'>
                <Table columns={columns} dataSource={exerciseData} pagination={false} className="custom-table" />
                {/* dataSource={ }  */}
            </div>
        </div>
    );
};
export default MyExcerise;