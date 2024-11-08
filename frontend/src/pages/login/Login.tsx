import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { useAuthContext } from '@/shared/contexts/AuthContext';
import { ILoginProps } from '@/shared/interfaces/LoginInterface';
import { MusicoCreate } from '@/shared/interfaces/MusicoInterface';
import { MusicoService } from '@/shared/services/api/MusicoService';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().required().min(5),
});

const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, handleLogin } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [senhaError, setSenhaError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  
  const [fullName, setFullName] = useState('');
  const [type, setType] = useState('admin');
  const [status, setStatus] = useState('Ativo');
  const [valorEvento, setValorEvento] = useState(0);
  const [instrumentos, setInstrumentos] = useState([]);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setSenha('');
    setType('admin');
    setStatus('Ativo');
    setValorEvento(0);
    setInstrumentos([]);
    setEmailError('');
    setSenhaError('');
  };

  const handleLoginSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ email, senha }, { abortEarly: false })
      .then((dadosValidados) => {
        handleLogin(dadosValidados.email, dadosValidados.senha).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.errors.forEach((error) => {
          if (error.includes('email')) setEmailError(error);
          if (error.includes('senha')) setSenhaError(error);
        });
      });
  };

  const handleSubmit = async () => {
    const formData: MusicoCreate = {
      fullName,
      email,
      senha,
      type,
      status,
      valorEvento,
      instrumentos,
    };

    const result = await MusicoService.create(formData);
    if (result instanceof Error) {
      console.log(result.message);
    } else {
      alert('Músico criado com sucesso!');
      resetForm();
    }
  };

  const toggleForm = () => {
    setIsCreating(!isCreating);
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={250}>
            <Typography variant="h6" align="center">
              {isCreating ? 'Criação de Músico' : 'Identifique-se'}
            </Typography>

            {isCreating ? (
              <>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  value={fullName}
                  disabled={isLoading}
                  onChange={(e) => setFullName(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'orange',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  disabled={isLoading}
                  error={!!emailError}
                  helperText={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'orange',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  value={senha}
                  disabled={isLoading}
                  error={!!senhaError}
                  helperText={senhaError}
                  onChange={(e) => setSenha(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'orange',
                      },
                    },
                  }}
                />
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  value={email}
                  disabled={isLoading}
                  error={!!emailError}
                  helperText={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'orange',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  value={senha}
                  disabled={isLoading}
                  error={!!senhaError}
                  helperText={senhaError}
                  onChange={(e) => setSenha(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'orange',
                      },
                    },
                  }}
                />
              </>
            )}
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            {isCreating ? (
              <Button
                variant="contained"
                disabled={isLoading}
                onClick={handleSubmit}
                endIcon={isLoading ? <CircularProgress variant="indeterminate" color="inherit" size={20} /> : undefined}
                sx={{
                  backgroundColor: 'orange',
                  '&:hover': {
                    backgroundColor: '#e68929',
                  },
                }}
              >
                Criar Músico
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={isLoading}
                onClick={handleLoginSubmit}
                endIcon={isLoading ? <CircularProgress variant="indeterminate" color="inherit" size={20} /> : undefined}
                sx={{
                  backgroundColor: 'orange',
                  '&:hover': {
                    backgroundColor: '#e68929',
                  },
                }}
              >
                Entrar
              </Button>
            )}
          </Box>
        </CardActions>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button onClick={toggleForm}
              sx={{
                backgroundColor: 'orange',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#e68929',
                  color: 'white'
                },
              }}
            >
              {isCreating ? 'Já tem uma conta? Faça login' : 'Criar uma nova conta'}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;
