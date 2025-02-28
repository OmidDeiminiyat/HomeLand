import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './Admin.module.scss';
import { useState, useEffect } from 'react';

export function Admin() {
  const [favorites, setFavorites] = useState([]); // State for storing fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Get the access token from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user ? user.access_token : null;

    if (accessToken) {
      // Start fetching data when the access token is available
      fetch('https://api.mediehuset.net/homelands/reviews', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
          setFavorites(data); // Set fetched data to state
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch(err => {
          setError(err.message); // Handle any errors
          setLoading(false); // Set loading to false even if there's an error
        });
    } else {
      setError('You are not supposed to be here duuuude');
      setLoading(false);
    }
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
    console.log(favorites);
    const myList = favorites.items;


    function letLogOut() {
      sessionStorage.removeItem('user');
      console.log('deleted');
      
    }
  return (
    <>
        <section className={style.Admins}>
            <div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>title</TableCell>
                    <TableCell align="right">Dato</TableCell>
                    <TableCell align="right">Handing</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {myList.map((row) => (
                    <TableRow key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.content}
                    </TableCell>
                    <TableCell align="right">{row.created_friendly}</TableCell>
                    <TableCell align="right"> Religer / Slet</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </div>
           

            <div>
                <p>Du er logget ind som admin</p>
                <button onClick={(letLogOut)} >Logout</button>
            </div>
        </section>
    
    </>
    
  );
}
