import React from 'react';

const Calendar = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full bg-gray-200 dark:bg-gray-100">
      <h3 className="text-sm font-semibold mb-4 text-gray-800 dark:text-gray-800">
        Select date for a view of your past measurements
      </h3>
      <div className="text-center">
        <p className="text-gray-800 mb-2 dark:text-gray-800">April, 2025</p>
        <div className="grid grid-cols-7 gap-1 text-gray-700 text-sm">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'].map(day => (
            <div
              key={day}
              className={`p-2 rounded-full ${
                day === '3' ? 'bg-blue-500 text-white font-bold' : ''
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
