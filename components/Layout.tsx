import styles from '../styles/Home.module.css'

const Layout = (props: { children: any; }) => {

  return (
    
      
        
    <div className={styles.container}>

        
  
        {props.children}
        
      
      </div>
    
  );
};

export default Layout;
