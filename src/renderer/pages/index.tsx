import { useEffect } from 'react'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'



export default function Home() {
  useEffect(()=>{
    //@ts-ignore
    console.log(window.electron)
  },[])
  return (
    <div className={styles.container}>            <Banner/>
    </div>
  )
}
