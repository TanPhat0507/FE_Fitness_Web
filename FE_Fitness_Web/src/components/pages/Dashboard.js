import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/Dashboard.css';
import { DateContext } from './DateContext'; // Import DateContext

const Dashboard = () => {
    const navigate = useNavigate();
    const workoutGoal = 160;
    const { selectedDate } = useContext(DateContext); // Lấy giá trị ngày từ DateContext
    const [userName, setUserName] = useState('User');
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user data and exercise data on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('userID'); // Assuming userID is saved in localStorage after login

        if (token && userID) {
            // Fetch user settings (name)
            fetch('http://localhost:3001/api/users/setting', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('User data fetched:', data);
                    if (data && data.name) {
                        setUserName(data.name);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });

            // Fetch exercise data based on selected date from DateContext
            const dateToFetch = selectedDate || new Date().toISOString().split('T')[0]; // Use selected date or current date if not available
            fetch(`http://localhost:3001/api/exercises?date=${dateToFetch}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Exercise data fetched:', data);
                    setExercises(Array.isArray(data) ? data : []); // Ensure the exercises state is always an array
                })
                .catch((error) => {
                    console.error('Error fetching exercise data:', error);
                })
                .finally(() => setLoading(false)); // Stop loading after fetch
        } else {
            navigate('/login'); // Redirect if no token or userID
        }
    }, [navigate, selectedDate]); // Add selectedDate as a dependency

    if (loading) {
        return <div>Loading...</div>; // Display a loading message
    }

    // Calculate total workout time, calories burned, and exercise completion
    const workoutTime = exercises.reduce((total, exercise) => total + (exercise.time || 0), 0);
    const caloriesBurned = exercises.reduce((total, exercise) => total + parseFloat(exercise.calories_burned || 0), 0);
    const exerciseCompletion = exercises.filter((exercise) => exercise.status).length;

    // Calculate workout percentage
    const workoutPercentage = (workoutTime / workoutGoal) * 100;

    return (
        <div className="dashboard-container">
            {/* Dynamic user name */}
            <h2 className="welcome-text">Welcome back, {userName} 👋</h2>

            <div className="dashboard-stats">
                <div className="card workout-time">
                    <h4>Workout time</h4>
                    <div className="circle-chart">
                        <svg width="100%" height="100%" viewBox="0 0 200 120">
                            <path
                                d="M 20 100 A 80 80 0 0 1 180 100"
                                fill="none"
                                stroke="#e0e0e0"
                                strokeWidth="30"
                            />
                            <path
                                d="M 20 100 A 80 80 0 0 1 180 100"
                                fill="none"
                                stroke="#E16449"
                                strokeWidth="30"
                                strokeDasharray={`${(workoutPercentage / 100) * 251}, 251`}
                            />
                        </svg>
                        <div className="circle-chart-text">
                            <span>{workoutTime}/{workoutGoal}</span>
                            <span>Minutes</span>
                        </div>
                    </div>
                </div>

                <div className="card calories-burned">
                    <h4>Calories burned</h4>
                    <div className="card-content">
                        <p>{caloriesBurned}</p>
                        <span>Kcal</span>
                    </div>
                </div>

                <div className="card exercise-completion">
                    <h4>Exercise completion</h4>
                    <div className="card-content">
                        <p>{exerciseCompletion}/{exercises.length}</p>
                        <span>Exercises</span>
                    </div>
                </div>
            </div>

            <h4>My exercises</h4>
            <div className="table-responsive">
                <table className="exercise-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time (minutes)</th>
                            <th>Calories burned</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.length > 0 ? (
                            exercises.map((exercise) => (
                                <tr key={exercise.diary_id}>
                                    <td>{exercise.exercise?.name || 'Unnamed Exercise'}</td>
                                    <td>{exercise.time || 0}</td>
                                    <td>{parseFloat(exercise.calories_burned) || 0}</td>
                                    <td><input type="checkbox" checked={exercise.status} readOnly /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No exercises found for today</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
