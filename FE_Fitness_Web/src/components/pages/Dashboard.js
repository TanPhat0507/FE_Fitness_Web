import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const workoutTime = 20;
    const workoutGoal = 160;
    const workoutPercentage = (workoutTime / workoutGoal) * 100;

    return (
        <div className="dashboard-container">
            <h2 className="welcome-text">Welcome back, John 👋</h2>

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
                        <p>174</p>
                        <span>Kcal</span>
                    </div>
                </div>

                <div className="card exercise-completion">
                    <h4>Exercise completion</h4>
                    <div className="card-content">
                        <p>2/4</p>
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
                        <tr>
                            <td>Running</td>
                            <td>60</td>
                            <td>104</td>
                            <td><input type="checkbox" /></td>
                        </tr>
                        <tr>
                            <td>Aerobics</td>
                            <td>100</td>
                            <td>70</td>
                            <td><input type="checkbox" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
