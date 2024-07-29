import { Box, Container, Paper, TextField, Typography } from '@mui/material';
// src/pages/UserStats.jsx
import React, { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 250 },
  { field: 'wallet', headerName: 'Wallet', width: 300 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'level', headerName: 'Level', width: 100 },
  { field: 'speed', headerName: 'Speed', width: 100 },
  { field: 'road', headerName: 'Road', width: 100 },
];

const UserStats = () => {
  const [userStats, setUserStats] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMinedNir, setTotalMinedNir] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(
          'https://link-nir.as.r.appspot.com/nirs?pageNumber=1&pageSize=10'
        );
        const data = response.data.data.map((item) => ({
          id: item._id,
          wallet: item.wallet,
          amount: item.amount,
          phone: item.user.phone,
          level: item.user.level,
          speed: item.user.speed,
          road: item.user.road,
        }));
        setUserStats(data);
        setTotalUsers(response.data.totalUsers);
        setTotalMinedNir(response.data.totalMinedNir);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user stats:', error);
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  useEffect(() => {
    if (loading) return;
    const filteredStats = userStats.filter((stat) =>
      stat.wallet.toLowerCase().includes(filterText.toLowerCase())
    );
    setUserStats(filteredStats);
  }, [filterText]);

  return (
    <Container maxWidth={false}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'>
        <Typography
          variant='h4'
          gutterBottom
          color={'black'}>
          User Statistics
        </Typography>
        <Typography
          variant='h6'
          gutterBottom
          color={'green'}>
          Total Users: {totalUsers}
        </Typography>
        <Typography
          variant='h6'
          gutterBottom
          color={'green'}>
          Total Mined NIR: {totalMinedNir.toFixed(2)}
        </Typography>
        <TextField
          label='Filter by Wallet'
          variant='outlined'
          fullWidth
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <Paper style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={userStats}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default UserStats;
