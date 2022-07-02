import styles from '../styles/Playground.module.css'
import { useEffect ,useState,useRef} from 'react';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
const Playground = (props: any)=>{
    const [connected,setConnected] = useState(false)
    const [username,setUsername] = useState<string>('');
    const [ipLogin,setIpLogin] = useState('1.0.0.2')
    const [password,setPassword] = useState<string>('')
    const [runOnce,setRunOnce] = useState(false)
    const [useEffectOnce,setUseEffectOnce] = useState(false)
    const [command,setCommand] = useState('');
    const [logs,setLogs] = useState<string[]>([])
    const [hostname,setHostname] = useState('');
    const [openModalAddRoute,setOpenModalAddRoute] = useState(false)
    const [ipAddress,setIpAddress] = useState('192.168.43.0')
    const [mask,setMask] = useState('255.255.255.0')
    const [nextHoop,setNextHoop] = useState('1.0.0.17');

    const logsRef = useRef(null);
    useEffect( ()=>{
      if(!useEffectOnce){
        window.electron.ipcRenderer.on("error",()=>{
          alert("some error occured")
          console.log('error client recieved')
          window.location.reload();
        })
           //@ts-ignore
            window.electron.ipcRenderer.on("connected",()=>{
              setConnected(true)
              })
            window.electron.ipcRenderer.on("logs",(args)=>{
              //@ts-ignore
             console.log(args)
             const regex = /([A-Za-z0-9]{1,15}(\([A-Za-z0-9]{1,15}\))?[\#>])/g
             const braces = /\([A-Za-z0-9]{1,15}\)/g
            const arr = (args as string ).match(regex);

            console.log(args,arr,braces,'..........//////')
            const hostname = arr
            ?arr[0]
            .replace('\r\n','')
            .replace(braces,'')
            .replace('>','')
            .replace('#','')
            :'';
            setHostname(hostname)
              //@ts-ignore
              setLogs(l=>{
                const newLogs = [...l];
                newLogs.push(String(args))
                return newLogs;
              })
            
            })

            setUseEffectOnce(true)


      }
     
     
    
    },[])


    const handleConnectTelnet = (e: any) =>{
      e.preventDefault();
      if(!runOnce && username && password && ipLogin){
        //@ts-ignore
         window.electron.ipcRenderer.connectTelnet({
            ip:ipLogin,
            username,
            password,
        })
        setRunOnce(true)
      }

    }
    const handleExecCommand = (e: any) =>{
      e.preventDefault();
    
      
     
       //@ts-ignore

      window.electron.ipcRenderer.execCommand(command)
      setCommand('')
      setTimeout(()=>{
        //@ts-ignore
        
        logsRef.current.scrollTop =  logsRef.current.scrollHeight;
      },500)
      console.log("...",logsRef)
    }
    const handleClose = ()=>setOpenModalAddRoute(false)
    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: '#312e2e',
      boxShadow: 24,
      borderRaduis:'10px',
      p: 4,
    };
    const handleAddStaticRoute = (e:any)=>{
      e.preventDefault();
      window.electron.ipcRenderer.execCommand(`config t`)
      window.electron.ipcRenderer.execCommand(`ip route ${ipAddress} ${mask} ${nextHoop}`)
      setTimeout(()=>{
        //@ts-ignore
        
        logsRef.current.scrollTop =  logsRef.current.scrollHeight;
      },500)
      setOpenModalAddRoute(false)

    }
    const handleDeleteStaticRoute = (e:any)=>{
      e.preventDefault();
      window.electron.ipcRenderer.execCommand(`config t`)
      window.electron.ipcRenderer.execCommand(`no ip route ${ipAddress} ${mask} ${nextHoop}`)
      setTimeout(()=>{
        //@ts-ignore
        
        logsRef.current.scrollTop =  logsRef.current.scrollHeight;
      },500)
      setOpenModalAddRoute(false)
    }
    return(
        <div className={styles.container}>
          
          <Modal
        open={openModalAddRoute}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Route Statique
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className={styles.modalContainer}>
              <table>
                   <tbody>
                        <tr>
                          <td><div>Ip address: </div></td> 
                          <td>
                          <input
                            value={ipAddress}
                            onChange = {(e)=>setIpAddress(e.target.value)}
                          />
                          </td>
                        </tr>
                        <tr>
                          <td><div>mask</div></td> 
                          <td>
                          <input
                            value={mask}
                            onChange = {(e)=>setMask(e.target.value)}
                          />
                          </td>
                        </tr>
                        <tr>
                          <td><div>next hoop </div></td> 
                          <td>
                          <input
                            value={nextHoop}
                            onChange = {(e)=>setNextHoop(e.target.value)}
                          />
                          </td>
                        </tr>
                      
                        
                   </tbody>
                </table>
                <div
                  style={{display:'flex',gap:"20px"}}
                >

                 <button
                    onClick={handleAddStaticRoute}
                 >Inserer</button>
                  <button
                    onClick={handleDeleteStaticRoute}
                 >Supprimer</button>
                </div>
                
               
             
              </div>
          </Typography>
        </Box>
      </Modal>
             {
              connected?(
                <div className={styles.connectMsg}>Vous etes connectés a {hostname}</div>
              ):(
                <form 
                className={styles.loginForm}
                onClick={handleConnectTelnet}
              >
                <h1>Telneting a device</h1>
                <table>
                   <tbody>
                         <tr>
                            <td><div>Ip: </div></td> 
                            <td>
                              <input 
                                value={ipLogin}
                                onChange={(e)=>setIpLogin(e.target.value)}
                              
                              />
                            </td>
                        </tr>
                        <tr>
                          <td><div>Username: </div></td> 
                          <td>
                            <input 
                              value={username}
                              onChange={(e)=>setUsername(e.target.value)}
                            />
                          </td>
                        </tr>
                      
                        <tr>
                          <td><div>password: </div></td> 
                          <td>
                            <input 
                              value={password}
                              onChange={(e)=>setPassword(e.target.value)}
                              type='password'
                            />
                          </td>
                        </tr>
                   </tbody>
                </table>
                   <button>Login</button>
              </form>

              )
             }

              {
                  connected&&
                  <div className={styles.configOptions}>
                      <div
                        onClick={e=>{
                          window.electron.ipcRenderer.execCommand(`enable`)
                          window.electron.ipcRenderer.execCommand(`end`)
                          window.electron.ipcRenderer.execCommand("show ip interface brief")
                          setTimeout(()=>{
                            //@ts-ignore
                            
                            logsRef.current.scrollTop =  logsRef.current.scrollHeight;
                          },500)
                        }}
                      >
                        Interfaces
                      </div>
                      <div onClick={()=>setOpenModalAddRoute(true)}>route statique</div>
                      <div onClick={()=>{
                            window.electron.ipcRenderer.execCommand(`enable`)
                           window.electron.ipcRenderer.execCommand(`end`)
                           window.electron.ipcRenderer.execCommand("show ip route")
                           setTimeout(()=>{
                              //@ts-ignore
                              
                              logsRef.current.scrollTop =  logsRef.current.scrollHeight;
                            },500)
                      }}>
                        table routage
                      </div>
                     
                  </div>
               }

             {
              connected&&
              <div className={styles.logsBox}>
                <div ref={logsRef} className={styles.logsContainer}>
                    {
                      logs.map((log,index)=>{
                        return (
                          <div key={index}>
                              {log}
                          </div>
                        )
                      })
                    }
                </div>
                
                 
              </div>
              
             }
          
            { connected&&
              <form
                onSubmit={handleExecCommand}
                className={styles.commandForm}
              >
                <input
                    value={command}
                    onChange = {(e)=>setCommand(e.target.value)}
                    placeholder = "exec a command..."
                 />
             </form>
            }
            
        </div>
    )
  
}
export default Playground;