import { LoginUsecase } from '../../../ForFable-Domain';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-toastify';

interface LoginProps {
  loginService: LoginUsecase
}

const Login: React.FC<LoginProps> = ({ loginService }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_user, setUser] = useContext(UserContext)
  const nav = useNavigate()

  const tryLogin = async () => {
    const response = await loginService.loginByCredential(username, password)
    if(response.data){
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      nav('/')
    } else{
      toast.error('Usuário ou senha incorretos')
    }
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  return (
    <div className="login">
      <div className="login-card">
        <div className="login-form">
            <label htmlFor="username">Username:</label><br/>
            <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} /><br/>
            <label htmlFor="password">Password:</label><br/>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} /><br/>
            <input type="submit" value="Entrar" onClick={tryLogin} />
            <div className="button-container">
              <Link className='forgot-password' type='button' to="/password-change">Esqueci minha senha</Link>
              <Link type='button' to="/register">Registre-se</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;