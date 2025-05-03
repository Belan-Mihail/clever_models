// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import 'react-toastify/dist/ReactToastify.css'
// import { useAuth } from '../hooks/AuthContext'


// const LoginPage = () => {
//     const [username, setUsername] = useState<string>('')
//     const [password, setPassword] = useState<string>('')
//     const navigate = useNavigate()
//     const { login, token } = useAuth();

//     useEffect(() => {
//         if (token) {
//             navigate('/')
//         }
//     }, [token, navigate])

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:3000/api/admin/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({username, password})
//             })

//             const data = await response.json()

//             if (!response.ok) {
//                 console.log("Error: ", data.message);
                
//                 // clear form
//                 setUsername('')
//                 setPassword('')
//                 return
//             }

//             login(data.token)
            
//             navigate('/dashboard')
//         } catch (error: any) {
            
//             setUsername('')
//             setPassword('')
//         }
//     }


//   return (
//     <div className='flex flex-col items-center justify-center m-8 rounded main mx-auto mt-10 w-max'>
//         <form className='flex flex-col items-center justify-center p-4 ' onSubmit={handleSubmit}>
//             <h2>Login as Admin</h2>
//             <div className='flex gap-2'>
//                 <label htmlFor="">Username:</label>
//                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='' placeholder='Enter username'/>
//             </div>
//             <div className='flex gap-2'>
//                 <label htmlFor="">Password:</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='' placeholder='Enter password' />
//             </div>
//             <div className='flex justify-between items-center my-2 p-4 gap-4'>
//                 <button type='submit' className='main-button p-2'>Login as Admin</button>
//             </div>
//         </form>
//     </div>
//   )
// }

// export default LoginPage