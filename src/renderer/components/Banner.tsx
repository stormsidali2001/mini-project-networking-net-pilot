import styles from '../styles/Banner.module.css';
import terminal from '../../../assets/terminal.png'
import terminalShadow from '../../../assets/terminal-shadow.png'
import monitor from '../../../assets/monitor.png'


const Banner = (props: any)=>{

    return (
        <div className={styles.container}>
            <section className={styles.wrapper1}>
                <div className={styles.infos}>
                    <div className={styles.title}>Setup your network<br/>in seconds </div>
                    <div className={styles.description}>
                        Configuring networks via cli becomes fastly boring, repeatitive ,time consuming and more vulnerable to bugs.
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img
                        src={terminal}
                        draggable = {false}
                        className ={styles.terminalImg}

                    />
                    
                    <img
                        src={terminalShadow}
                        draggable = {false} 
                        className ={styles.terminalImgSh}
                    />

                </div>
            </section>
            <section className={styles.wrapper2}>
                    <div className={styles.wrapper2Container}>
                        <div className={styles.solutionTitle}>Solution ? </div>
                        <div className={styles.solutionInfos}>
                            <img 
                                 src={monitor}
                                 draggable = {false} 
                                 className ={styles.imageMonitor}
                            />
                            <div className={styles.solutionDescription}>
                            An intuitive ui which makes you do it in ease !!!
                            </div>

                        </div>
                     
                    </div>
            </section>

        </div>
    )
}

export default Banner;