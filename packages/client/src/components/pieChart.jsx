import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({completedCount, tasks}) => {
 const inCompleted = tasks.length - completedCount
    const data = {
        labels: ['completed', 'inCompleted'],
        datasets: [
          {
            label: '# of Votes',
            data: [completedCount , inCompleted],
            backgroundColor: [
              'rgba(0, 0, 255, 0.6)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
        
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
  <>
    <div className='header'>
      <h1 className='title'>Task Progress</h1>
    </div>
    <Pie data={data} />
  </>
)
};

export default PieChart;