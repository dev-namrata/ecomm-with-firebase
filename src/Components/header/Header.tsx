import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { useCart } from 'react-use-cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

import {
  Link,
  useActionData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import styled from 'styled-components';

function Header(props: any) {
  const auth = getAuth();
  const navigate = useNavigate();
  console.log(auth?.currentUser?.displayName, 'Auth');

  const { totalUniqueItems } = useCart();

  const logOutUser = async () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You are logout successfully',
          showConfirmButton: false,
          timer: 1000,
        });
        navigate('/login');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  const naviagteToCart = () => {
    navigate('/cart');
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette?.background.paper}`,
      padding: '0 4px',
    },
  }));

  const location = useLocation();
  if (
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/reset'
  ) {
    return <></>;
  }

  return (
    <div style={{ position: 'sticky', top: '0', zIndex: '99' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: 'black' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: 'flex' }}
            >
              e<span style={{ color: 'orange' }}>Shop</span>
            </Typography>
            <p style={{ margin: '25px' }}>{props.user}</p>
            {auth?.currentUser?.displayName ? (
              <StyledBadge
                badgeContent={totalUniqueItems}
                color="error"
                onClick={naviagteToCart}
                style={{ cursor: 'pointer' }}
              >
                <ShoppingCartIcon />
              </StyledBadge>
            ) : (
              ''
            )}

            {auth?.currentUser?.displayName ? (
              ''
            ) : (
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Login
                </Link>
              </Button>
            )}
            {auth?.currentUser?.displayName ? (
              <Button color="inherit" onClick={logOutUser}>
                <Link
                  to="/login"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    margin: '10px',
                  }}
                >
                  Logout
                </Link>
              </Button>
            ) : (
              ''
            )}
            <img
              style={{ height: '16px', padding: '6px' }}
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBEVEhURERIPEREREREREQ8PDxEPDw8PGBQZGRgUGBgcIS4lHB4rHxgYJjgmKzA/NTU1GiQ9RjtAPy5CNzUBDAwMEA8QGhISGDQhGCExMTE0MTQ/NTE0NDE1NDExPzQxNDExNDQxQDE0NDg/MTQxMTE/PTgxQD81MTY3MT8xMf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EAEcQAAICAgADAwcJAwkHBQAAAAECAAMEEQUSIQYxQRMiUWFxktEHMkJSU4GRotIVQ8EUFjNUcoKTseEjNGKho8LiRGNzg5T/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAYF/8QAKBEAAgECBQQCAgMAAAAAAAAAAAECAxETITFRUhIUQZEEQjJhInGx/9oADAMBAAIRAxEAPwBut9RtLNiJCEQzyzPSJlLli5EcddiKuNSosmSB+TnQuoRDLOkdybFUeMo8TIl0eJopMdEo9e5VHjVfWJZDZmWVQJSbFlW4lZXKUiWhQHUOlko6QcNRaDyPOsIujw6tIasaJ3BukAyR0iUdI1KwnERZJxWjLpFnWWnchqwwjxhTM9HjdbRSQ4sLLrK7l1kFoHYkXZI8RBOkIsGhcr0irjRmhyRXIrlxZEkUred8pAr0kLSrCuaFNkdQ7mRU80KXmcolxYSyuJXUj0TS74G5JEZWKauZH8mHonI7ySTXqe5n0nUl4HHfcMwiasNMJW05kVeIlFMaqIYaMm9ijM7o3SdjXjBZNWjBo+jL1IL2JqCj5AddjvibpC4ERo3S8REKjRNDTNQNuBtSVqeEJkjELEi7rNC1Iq6SkxNAEMYRouwl62jauJMcUzpEGjQombNEDZYCxI2RBukcWS0ZzCFqedtSAXpNdURoaCNCpE63jVbSJIpMZAnCs6ssJkaA+WBuqjYWRq9ykxNGG6QLTRvqiViTaLuZSViiNHaXmeIxS8JIUWbFTyziK0PGwZg1Y2WYvySQ2pIXHYxMZ5p62NzDRtGbGDaCNembTRjFkMJW+pLk0YMGZmg7cgddjvmXamjNGizUHlVfSji7CaFce3RjV6b6iZ56RvGu8DKZKAOsiNGLUixWADFbxhWiCNGUeS0UgrQLrCyjCIYs6QI6Rt1gXWWmQ0draMIYosYRpMkVFh5wicBlpBQB0itlc0CIF65pGREoiKHUboeL2JqRHlNXJWRrpLgRfFfca1MpI1iyCEQQYhEMhFAMmrpMu6ubrDYmdlVTSLIkjGcSI0LakWPSbrNGLyZp0PH0aY1Fk0a3mMomkWM7kguaSRY0uYOQmjD4lutR3L4dYd6rf3CJnph2hvmEe0gTsVOcllFnI6kIyzaN3567HfFSI7w3BtP1Bv0vHb+AW94NfvH4Se2q8WV3FPkjHRo0jbGjLvwe4HuQ+x/jLJw2/wCp+DL8ZD+PVX1ZSr039kZeRXoxdW1N9+FXsP6M/ivxmfdwe8fQ/MvxlRo1H9X6E6sN17OV2BhqCdIanh1wPzQP76x5eEWkfQ9+Pt6vFix6fJGKekIjTRfgl3oT3v8ASA/Zdw+iD7GWDoVbfixKvTv+SKo0hh04dd9mfeX4wg4bf9mfxX4yMGpxfo0xobr2JkQbJNH9lX/Z/iy/Gd/ZF/1B76/GCoVOL9CdanyRkFZdDNF+D3/UHvrB/sq4fQ/MsvAqcX6IxqfJAEMJCrw277M+8vxhk4Zf9mfeX4yHQqcX6NFWhuvYpOETQHCL/s/zp8Z39jX/AFB76xKhV4v0DrU+S9mXZVsRB10Z6ReDX/VX3xAZXAru/lX3xNY0avF+jOVanyRkY9miJsVMCJmnhlwPzfzLHcLEu7uQ+8vxil8epxY414ckFInQY6OGXnurPvL8ZP2RkfZ/mX4zF0KniL9GuNT5L2Kq0pcmxH14NkfUHvL8Zc8Gv9Ce+JS+PW4v0J16XJezy99cQtSetu4Dd/wD2ufhELuA3f8At+8fhNYUKvFmUq1LkjzqNqOU2Q9nBLR4p7x+EGvDbR9T3j8JpL49R/VkKvBeUF55JP2fZ/we9/pOzPtanFl9xT3R7/iFHfPJ8So5TsT3mSmwZ5ziWLsHpPQHwzH4flaOjPT41oddHvninBRpu8Nyu6AGrakEjajRIYbi1iwAZreUyatjcFU8aB2IAYlq8phsa7wMZy6NzMJ5TADVI3Auk7RZsQrDcAAI0mbxGqitrb7ErrXvdzrZ8FA7yfUIpxfPrx6nvtOkRdn0se4KvpJOgJ8vwqreMZNlmTZYlVNfMlNSlvJozaHID0J2AT4trp3aGtOn1XlLJITZs8U+Um+xxVw+gAO61JfeuyzsdAKvzV7x3k+yAs4b2gsf/a5dldYSyx7qbuStCnNzIRXynm2uunT1z22DVVh41LVsr4taKltml6L/AFjoNAgnzj6CSfmw9t3LZlUHufHOTX1GuVkKOq+xkDH/AOSaqaWUUrfsVjwicF7Q12OiZbsqMgS2+82V3sxAARX5td/iB3TnCvlCyayVz8csqWGl8iqsoyWjvVh80t46Gj6p7qjMFj4KBt89DZba67RalQb/AL1wPtWDylryqchrXK4ro9Nb8yjzB0e8EjXVhpT6EB+lDrTyklYLD3CuI05FYtosWxG+kveD9Vh3qevcZoqZ8fz8ezg99ORiva1WQpD0XjRdE5d85AABPMWA718e8ifVeD8RryaUvqO0sG9H5yMOjI3rB2JnUpdKUo5pjTNFTLQYl1MxGRllSARoy5ldQAysvH0d66QFT6M1702Jk2JowA2MPI6a3HgZ5zGt1NjHu2IAOAyNKB5fcABWCIXJNJhFbUgBj3VRG2ubViRO6uAGVozsZ8nJAD2pMz86gER4yjrsagB4niuJ1JHhM7Dv5W1PX5+LsGeQz8co2/XAD1OBkAjv74267nluF5WuhnpaLARAALDRh6nnLEgVOjAB5huZedjeImijztibGoAYVFvKZpo2xuZ2bj8p3L4GR9EwA8N8qGQ92RjcOq+c+rGBOlLMSqbPoADk+2er4VjW141S1NjtZXWi2Uo+8cuBohHGynXx0R39J4vtFjl+0FaGx6vMqZLEZVcclJYKpYgdSCvf4/dPc8QVX2XwcqxvB62xksHscWqw/GdM8oRj4tcnyZ1/EOSxjWjLa4JyeF5PKhyk1pnx22UZ9fVJDDoQDMGjiWnoVGZ0pd6aXcEO/D8jVRqcHrz1WeTVt+AU+1jjNdrJyGviJr3/AEedjYuXUh8CtiWK6EenmJni+0OdYhVVcqW85n5ibCQOUAtrewDrZJbWtsdDWtOCkDZ6LD4m/klXn8nzYGFh+X2d42KlQtybh6DyvWo9LMo756TG4jWTUbEdErVf2fwmpOfJdVGkvuQdE6a5QxCr3k71r5bwTiFnlErLFkPQczDaFVJVgWVh5uugIIGgdAgEe74P5VS3IM9FY81lmBg12XWknvfItd2Y/cP4SqlNJBc9w1V1lbm8V1oysBjBudTsEAW2ePhsKNDr1aeF+TrJtxcyzht/KvlV8ogRw6C0KD5rAnYKD8UnrMGunoWxs933vnzEsuYH0jnYhf7oE8X2mrejjOJk+Uci66kJWyhTRWGVDWNE7BDMfDv++ZU1e8Xo0M+szqmcM5OQYWSVBloAUIiWXX4x8wNibgBjdxjuNdAZFejBo2oAbldkYRplUWR+t4AMmBdYRTIwgAi6xaxJoOsXdIAIeTkjXJOQA29yQVT7A9kJAAOQmxPPcWwtg9J6ciJ5VHMIAfO22jEeueg4XmbAi3GMHRJmTiZBRtQA90p2IG1PGAwMoOseI2IAL1P1jgMSsTUPj2bGvGAHcikMNTz9yMjffPTRHiOLzqWHf4wA+Ydv8av+U4uXYpaolKrwGYEqjc3h13ylu76s9ymSt9IyVzDXjEFuelK6RygkEO1gZh19Gj0mTxjh630vjv05x5ra3yOOqt9x/wCW5j9jONul1fDsqlOfGWwV2s3VOUbXkQjziQTpl84gidK/nBbr/CfI3xXh9To9or8nSg2/EOKvdkuR4eRxnY79A5gAemgRPO8R4b5QeTsSxW5UdBZ/S1LawroLgaVGZiD5NQAqqdjmOx9HyqAT/K8pSVo8/Hxdc3I/cHIHz7SSAv1d6HUknPThTeUxltCtfkZbZ+WQeYA1ISlYP1UZqlHp0T4yoVLAz55h8LqqbnRjvzQLLGIVUd2rRiy6KqXRkLr1Usp7tg+j4Nw7bO3kHeypgt6UucDiuIx7mJqKJkKepDdCfWek1eH8IQJQzIGrORxLh2Sp1ymi3Js8nv2WIgH9uamFw1tit3ZMzDULRma87IxCfMFn116crr4FeYaJBjnUuCQ1wvmdS1GY9iqeVqsqpXeltb5GACOraI6Psz5zninK47Q2Oy2c1lL32VszIXqO25dgaHJWPSPRPadq+PLi0pk2Y/NkB1qIForZVIY8yPrboeXu1r0gETF+S/gz7s4lcgV8guKVC8qhGbmd1XwBPQeoHwMUH0xlN/0gZ9G5pNzhlSZyFBVaFBi6tCq0ACSrCdE5ABPJrmeyamzam4hfXAAFVmpoU2TL7jGaLIAbFbw24hU8aR4AdcQLrGDBOIALcs5DcskAO41nd7I6pnmK+M4ya576V16bE3+G4Ru2PD1/fhv7CWP/AJCQ5wWskRKpCOrR6SVZZ5S35QMIdy5L/wBmtQPzMIu/yiY/0aMg+01r/EyHXpryZv5FJeUeg4hiBlPSeJ4niFGJjN3yib+bi/e2R/AJ/GYXFO1djjfkKlHo5naLuae4u6pbm3wnO0QCZ6uiwMARPjqdo3VttWuvHkcj/MT0vCu3dajlaq0+wp8ZeLDcvGha9z6Ey7ih2rTzD9vax3Y1h9tiL/AwL9ugw/3U/wD6P/CS69PcnuKe57utww2Jb/KeCxe3iKfOx316rFP8BHLO31WtjHtI9boIY9PcO4p7mtxXE15y908nxzgSZIVg3ksivXkr12CNHYVtddb6g94PdHrO3lbAqcZ9eu1f0zIu7VV82zVYvsZH+EqPyYxldPMFXpvyZeJ2hyeHI1GZj23ata6l3uLIzkAAByDtRpmHjs9RPU0duOHnkyntCM1SVmlVd7KnYlrARrZUcqedrR1BY3arBdTXf51bdGS2kup9o0REcrhHZ5yW2aiev+xN6AexSCB+E6e4oyzlk/0ViR3R6LJ49gV1+QfIqBvuyHrdGDpW5sLq7suwgDMpBPo9UwuNfKLStwWik3siDyV1dmg1j656iOXZXu6gnqq9OkTo4B2eU9bsh/UzWAflQGei4Vk8FxjugVI31zVY9nvsCY8f48fN2GJHdHmezPYrJyXXJ4m1wpVi9ePa7NY/MQTsE+Yp8R3nU+pKgUBVAVVAVVA0FUDQAHgJjHtVg/bj3LP0zh7WYP23/Ts/TMZ/IjJ5tWGqkF9kbYnGExF7VYP249yz9MuO0+D/AFhPdf8ATIxIboeJHdGpuFRpiP2lwf6wnuv+mVXtTgj9+vuWfphiR5IMSO6PRgzswF7W4H24/wAOz9Mt/O7A+3H+HZ+mGJHdCxYckbxEXurmavazh5/9Qn3pYP8Atl/5zYBH+81/n+EMSPJDxYckVuTUoh1A5HaHB/rFf5/hEH7R4Q/fr9yP+mHXHkgxI8kehpeO1vPIr2pwh++/Cuz4RhO2OCP3jfdVZ8IYkd0GLHdHrVMjTzK9tcD7R/8ABf4Tp7b4P17D/wDS8WLDdE41Pkj0mpJ5v+e+D9a3/BaSGNDdBj090fIUMZQxJTGK2ny5I+VJDU6soplxMmYtHSJF69D4wgEGy6ghGbm45BiavozddA66PeO6YuRWQTOiEr5M6qcrqzNLHsDrrxEIDMnGuKma3MGHMPv9RinGzJnGxLU2NiTHsA809x/5TqP4HuMFemj6vCQiVmgrpo/5QdibEJW4Ycp7/CcIi0EsmZzDRh6bN9DO3pvqIsDozVZo11Q6DCI0XR4RTM2rGbVgpMqZwmQGICGVEvKmIR0GcIkEuIwOLLATnLLrEJlDOoZZ1lIEhWSKuscqMHekaZUWKCdEhE4DKLDKZcGCUwgMghovudg9yQJM9oWtoOwTiNNtUdBo1NuXMSrs1HlPMNiZSiYyiEqMK6bi6GNKem5BmKnofZF8uoEcw++PXp4xcnwlRdmXF2ZgsujG8LI10Pce+TLo0dxNW0Z1ZSR1r+SNo+qFU8w5T3+ERxrtjUZVtTnasznkrMCdqYzzhhvxlb1BHMO/xi9b6MeotQzCKXJHYJ1ii7MadhNGjKNFrE1O1vNJK5pJXQ6DONKKYUCZmZxTOkSohdRMTBzqmRhOCIQbWxOCStoR0jGd5diCdYZDJYkRLQFDGSARFYetoCQpYsFHL1ijSkaI6JcQYMspiYNBJJzckQrCtiwQEZcRczWLyNYshMYxL9H1RY90Gr6MrpuhuNzcceI8YShvCK4lmxyn7oQHUwkrHPJWY2TF7U0YRm2PXKnqNRCFLk2Jk5NejNlhFcivc1pyszWnKzM6l9GaVb7G5l2LqHxrNdJrON1c2nG6uaaNAWJoyyNLsNiYLIwWRWp4VhFN6MaqbcbQSQvakVPQx91ilqSoMuMvBetowjRFG0Y0jQkgkhh18Z2udpYHoZNaMgg46weoy67EXYREkVo0jbEThqmiAJ3GF7xKNIjRsAbLOIYVxBaiJLv3RNxGmPSLuOsaNIg5YSpnQZQ2XkkkkiI6xZxOySojiCMXfvkkm0TaIzi2Hc0+bY3OyTGpqY1dQlbeEjHRkkmZkRxvrFnEkkENamdkpFVOjJJOuGh2R/Eex26RtDJJMZ6nPLUHekrU2jJJBaDWg3YNgNFbFkkkrUUdRR1hamkkmr0LegyjaMabr1kkmZmXr7oCxZJImJlJ1ZJJIBQ3ScRp2SMZcmUkkiZDKsYFpJI0UgbSCSSUWWkkkiJP/9k="
            />
            <p>INDIA</p>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
