import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Training, TrainingStatistics } from '../types';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  } from 'recharts';

export default function Statistics() {
  const [statistics, setStatistics] = useState<TrainingStatistics[]>([]);

  const fetchTrainings = () => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then((data) => {
        const formatted = data.map((training: Training) => ({
          ...training,
          date: dayjs(training.date).format('YYYY-MM-DD HH:mm:ss'),
        }));

        const grouped = groupByActivity(formatted);

        const activityArray: TrainingStatistics[] = Object.entries(grouped).map(
          ([name, details]) => ({
            name,
            duration: details.totalDuration,
          })
        );

        setStatistics(activityArray);
        console.log('statistics:', statistics);
        console.log('activityArray:', activityArray);
      })
      .catch((err) => console.error('Fetch error:', err));
  };

  const groupByActivity = (trainings: Training[]) => {
    return _(trainings)
      .groupBy('activity')
      .mapValues((group) => ({
        trainings: group,
        totalDuration: _.sumBy(group, 'duration'),
      }))
      .value();
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <div style={{ width: '95vw', height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <BarChart width={1000} height={700} data={statistics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
    </div>
  );
}
