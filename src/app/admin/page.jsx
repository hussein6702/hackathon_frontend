"use client";

import React, { useEffect } from 'react';
import gsap from 'gsap';

const Admin = () => {
  useEffect(() => {
    gsap.fromTo(
      '.cell',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
    );
  }, []);

  return (
    <div className="flex flex-col w-4/5 mx-auto h-[80vh]">
      <div className="flex w-full h-1/2 mb-2">
        <div className="cell border-4 border-gray-700 p-3 rounded-lg" style={{ width: '30%' }}>Cell 1: 30%</div>
        <div className="cell border-4 border-gray-700 p-3 mx-2 rounded-lg" style={{ width: '40%' }}>Cell 2: 40%</div>
        <div className="cell border-4 border-gray-700 p-3 rounded-lg" style={{ width: '30%' }}>Cell 3: 30%</div>
      </div>
      <div className="flex w-full h-1/2">
        <div className="cell flex-1 border-4 border-gray-700 p-3 rounded-lg">Row 2: Full Width</div>
      </div>
    </div>
  );
};

export default Admin;