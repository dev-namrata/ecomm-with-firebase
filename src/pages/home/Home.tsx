import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useCart } from 'react-use-cart';
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

function Home(props: any) {
  const auth = getAuth();
  const [products, setProducts] = useState<any[]>([]);
  const { addItem } = useCart();
  const allProduct = () => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    allProduct();
  }, []);
  const Item = styled(Paper)(({ theme }: any) => ({
    backgroundColor: theme?.palette?.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography?.body2,
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme?.palette?.text?.secondary,
  }));

  const handleClick1 = (data: any) => {
    addItem(data);
  };

  const handleClick2 = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Item added to cart...View your cart',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClick3 = (data: any) => {
    if (!auth?.currentUser?.displayName) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please Login First',
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    return true;
  };

  const handleBothClicks = (data: any) => {
    if (!handleClick3(data)) {
      return;
    }
    handleClick1(data);
    handleClick2();
  };

  return (
    <div>
      {/* <h3>{props?.name ? '' : 'Please Login'} </h3> */}

      <Box sx={{ width: '100%', padding: '30px', margin: '-20px' }}>
        <Grid
          container
          spacing={3}
          style={{ justifyContent: 'center', width: '100%' }}
        >
          {products.map((data) => {
            return (
              <Grid item xs={12} md={2.5} key={data.id}>
                <Item>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={data?.images[0]}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ fontSize: '15px' }}
                    >
                      {data?.title}
                    </Typography>
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                      ₹{data.price}
                    </Typography>

                    <Button
                      style={{ margin: '20px' }}
                      variant="contained"
                      onClick={() => handleBothClicks(data)}
                    >
                      Add To Cart
                    </Button>
                  </CardContent>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
