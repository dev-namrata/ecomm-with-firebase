import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import useRazorpay from 'react-razorpay';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

function Cart() {
  const [Razorpay] = useRazorpay();
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();

  if (isEmpty) return <p>Your cart is empty</p>;
  console.log('items', items);

  const placeOrder = () => {
    const amountInPaise = Math.round(cartTotal * 100);
    let options = {
      key: 'rzp_test_fuRwrEeyszeguJ',
      amount: amountInPaise,
      currency: 'INR',
      name: 'Namrata Kushwah',
      description: 'we connect you with shop at your place',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu-vHG_zt83vKIiWprxvzep76hN89__VEQYw&usqp=CAU',
      handler: function (response: any) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Namrata',
        email: 'namrata@thoughtwin.com',
      },
      notes: {
        address: 'Hello World',
      },
      theme: {
        color: '#F37254',
      },
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Typography variant="h4">My Items: ({totalUniqueItems})</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {items.map((item: any) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <div
                  key={item.id}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <TableCell>
                    <img
                      src={item?.images[0]}
                      alt={item.name}
                      style={{ height: '147px' }}
                    />
                  </TableCell>
                  <TableCell> {item.title}</TableCell>
                  <TableCell> {item.price} </TableCell>
                  <TableCell>Quantity ( {item.quantity} )</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                      style={{ margin: '10px' }}
                    >
                      -
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                      style={{ margin: '10px' }}
                    >
                      +
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove Item
                    </Button>
                  </TableCell>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ padding: '10px' }}>Total Price:₹ {cartTotal}</div>
      <Button
        variant="contained"
        color="error"
        onClick={() => emptyCart()}
        style={{ margin: '10px' }}
      >
        Clear Cart
      </Button>
      <Button variant="contained" color="success" onClick={placeOrder}>
        Payment
      </Button>
    </>
  );
}

export default Cart;
