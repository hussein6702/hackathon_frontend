"use client";

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Admin = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("spa");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [delegateIndex, setDelegateIndex] = useState(null);
  const [showPositive, setShowPositive] = useState(true);

  const sentimentData = {
    spa: { positive: 70, negative: 30 },
    room_service: { positive: 85, negative: 15 },
    pool: { positive: 60, negative: 40 },
    restaurant: { positive: 75, negative: 25 },
    wifi: { positive: 50, negative: 50 },
  };

  const employees = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
  const delegateData = [
    { username: "User1", icon: "spa", complaint: "Complaint about spa services." },
    { username: "User2", icon: "room_service", complaint: "Complaint about room service." },
    { username: "User3", icon: "pool", complaint: "Complaint about pool cleanliness." },
  ];

  const complaints = [
    { username: "User1", icon: "spa", text: "Complaint about spa services." },
    { username: "User2", icon: "room_service", text: "Complaint about room service." },
    { username: "User3", icon: "pool", text: "Complaint about pool cleanliness." },
    { username: "User4", icon: "restaurant", text: "Complaint about restaurant service." },
    { username: "User5", icon: "wifi", text: "Complaint about Wi-Fi connectivity." },
  ];

  const lineChartData = {
    labels: Object.keys(sentimentData),
    datasets: [
      {
        label: "Positive Sentiments",
        data: Object.values(sentimentData).map((data) => data.positive),
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        tension: 0.4,
      },
      {
        label: "Negative Sentiments",
        data: Object.values(sentimentData).map((data) => data.negative),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPositive((prev) => !prev);
    }, 3000); // Flip every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.cell',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
    );
  }, []);

  const handleExpand = (index) => {
    if (expandedIndex === index) {
      gsap.to(`.complaint-${index}`, { height: '4rem', backgroundColor: '#F97316', duration: 0.3 }); // Orange-500
      setExpandedIndex(null);
    } else {
      if (expandedIndex !== null) {
        gsap.to(`.complaint-${expandedIndex}`, { height: '4rem', backgroundColor: '#F97316', duration: 0.3 }); // Orange-500
      }
      gsap.to(`.complaint-${index}`, { height: '75%', backgroundColor: '#F97316', duration: 0.3 }); // Orange-500
      setExpandedIndex(index);
    }
  };

  const handleExpandDelegate = (index) => {
    setDelegateIndex(index === delegateIndex ? null : index);
  };

  const handleDelegateTask = () => {
    if (selectedEmployee) {
      alert(`Task delegated to ${selectedEmployee}`);
    } else {
      alert("Please select an employee to delegate the task.");
    }
  };

  return (
    <div className="flex flex-col w-4/5 mx-auto pt-20 h-[80vh]">
      <div className="flex w-full h-1/2 mb-2">
        <div
          className="cell border-2 border-gray-700 p-4 rounded-lg overflow-y-auto scrollbar-hidden"
          style={{ width: '30%' }}
        >
          <h1 className="font-bebas text-4xl  text-black">Complaints</h1>
          <div className="space-y-4 mt-4">
            {complaints.map((complaint, index) => (
              <div
                key={index}
                className={`complaint-${index} relative border p-3 rounded-lg transition-all duration-300`}
                onClick={() => handleExpand(index)}
                style={{ cursor: "pointer", height: expandedIndex === index ? '75%' : '4rem', backgroundColor: '#F97316' }} // Orange-500
              >
                <div className="flex items-center justify-between">
                  <div className="text-white font-bebas">{complaint.username}</div>
                  <span className="material-icons text-white">{complaint.icon}</span>
                </div>
                {expandedIndex === index && (
                  <div className="mt-4 text-white">{complaint.text}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="cell border-2 border-gray-700 p-4 mx-2 rounded-lg" style={{ width: '40%' }}>
          <div className="flex justify-between items-center">
            <h1 className="font-bebas text-4xl text-gray-900">Sentiments</h1>
            <select
              className="p-2 border rounded-lg text-black font-bebas"
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
            >
              <option value="spa">Spa</option>
              <option value="room_service">Room Service</option>
              <option value="pool">Pool</option>
              <option value="restaurant">Restaurant</option>
              <option value="wifi">Wi-Fi</option>
            </select>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <span className="material-icons t text-orange-500" style={{fontSize:"150px"}}>{selectedIcon}</span>
            <div className="mt-6 text-center font-bebas text-4xl  text-gray-900">
              <p>Positive: {sentimentData[selectedIcon].positive}%</p>
              <p>Negative: {sentimentData[selectedIcon].negative}%</p>
            </div>
          </div>
        </div>
        <div className="cell border-2 border-gray-700 p-4 rounded-lg overflow-y-auto scrollbar-hidden" style={{ width: '30%' }}>
          <h1 className="font-bebas text-4xl text-gray-900">Delegate</h1>
          <div className="space-y-4 mt-4">
            {delegateData.map((item, index) => (
              <div
                key={index}
                className={`relative border p-3 rounded-lg transition-all duration-300 ${
                  delegateIndex === index ? "h-[75%] bg-orange-500" : "h-16 bg-orange-500"
                }`}
                onClick={() => handleExpandDelegate(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-black font-bebas">{item.username}</div>
                  <span className="material-icons text-black">{item.icon}</span>
                </div>
                {delegateIndex === index && (
                  <div className="mt-4">
                    <p className="text-black">{item.complaint}</p>
                    <div
                      className="mt-4"
                      onClick={(e) => e.stopPropagation()} // Prevent click event from propagating
                    >
                      <select
                        className="p-2 border rounded-lg w-full text-black font-bebas"
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((employee, idx) => (
                          <option key={idx} value={employee}>
                            {employee}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="mt-4 p-2 bg-orange-700 text-white font-bebas rounded-lg w-full"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from propagating
                        handleDelegateTask();
                      }}
                    >
                      Delegate Task
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full h-1/2">
        <div className="cell border-2 border-gray-700 p-4 rounded-lg flex flex-col items-center" style={{ width: '60%' }}>
          <h1 className="font-bebas text-4xl text-gray-900 mb-4">Realtime Statistics</h1>
          <div className="w-full h-3/4">
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="mt-4 text-center">
            {showPositive ? (
              <div className="text-green-600 font-bebas text-4xl">Positive Comments: {Object.values(sentimentData).reduce((sum, data) => sum + data.positive, 0)}</div>
            ) : (
              <div className="text-orange-600 font-bebas text-4xl">Negative Comments: {Object.values(sentimentData).reduce((sum, data) => sum + data.negative, 0)}</div>
            )}
          </div>
        </div>
        <div className="cell border-2 border-gray-700 p-4 mx-2 rounded-lg" style={{ width: '40%' }}>
          <h1 className="font-bebas text-4xl text-gray-900 mb-4">Get an AI summary</h1>
          <p className="text-gray-700 mb-6">
            Get recommendations and actions you can take to improve your hotel.
          </p>
          <button className="flex items-center bg-orange-400 hover:bg-orange-600 text-white font-bebas text-xl px-6 py-3 rounded-lg">
            <span className="material-icons text-white mr-2" style={{ fontSize: '24px' }}>stars</span>
            Generate Suggestion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;