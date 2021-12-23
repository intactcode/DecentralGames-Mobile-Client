import { Box } from '@mui/system';
import { styled } from '@mui/system';
import Hamburger from './Hamburger';
import Aux from './_Aux';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Logo = styled(Box)`
  position : absolute;
  left : 10px;
  top : 10px;
  z-index : 20;
  cursor : pointer;
`;
const Layout = (props: { children: any }) => {
  return (
    <Aux >
      <Box style={{ position: 'relative', overflowX: 'hidden' }}>
        <Hamburger />
        <Logo>
          <Link href="https://decentral.games/">
            <Image src="/images/dg-logo.png" alt="logo" width={40} height={40} />
          </Link>
        </Logo>
        <div className={styles.container}>{props.children}</div>
      </Box>
    </Aux>
  );
};

export default Layout;
