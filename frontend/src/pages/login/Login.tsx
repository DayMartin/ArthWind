import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { ILoginProps } from "@/shared/interfaces/LoginInterface";
import { MusicoCreate } from "@/shared/interfaces/MusicoInterface";
import { MusicoService } from "@/shared/services/api/MusicoService";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().required().min(5),
});

const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, handleLogin } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [senhaError, setSenhaError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const [fullName, setFullName] = useState("");
  const [type, setType] = useState("admin");
  const [status, setStatus] = useState("Ativo");
  const [valorEvento, setValorEvento] = useState(0);
  const [instrumentos, setInstrumentos] = useState([]);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setSenha("");
    setType("admin");
    setStatus("Ativo");
    setValorEvento(0);
    setInstrumentos([]);
    setEmailError("");
    setSenhaError("");
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
          if (error.includes("email")) setEmailError(error);
          if (error.includes("senha")) setSenhaError(error);
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
      alert("Músico criado com sucesso!");
      resetForm();
    }
  };

  const toggleForm = () => {
    setIsCreating(!isCreating);
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#f7f7f7" }}
    >
      <Card
        sx={{
          border: "1px solid #ff7f50",
          width: "70%",
          maxWidth: 900,
          display: "flex",
          flexDirection: "row",
          borderRadius: "10px",
          boxShadow: 4,
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          width="50%"
          padding={3}
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "10px 0 0 10px",
          }}
        >
          {" "}
          <Typography variant="h5" align="center" sx={{ color: "#333" }}>
            {isCreating ? "Bem-vindo(a)" : "Bem-vindo(a)"}
          </Typography>
          <Typography variant="h5" align="center" sx={{ color: "#333" }}>
            {isCreating ? "Cadastre-se" : "Login"}
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ff7f50",
                    },
                  },
                  marginBottom: 2,
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ff7f50",
                    },
                  },
                  marginBottom: 2,
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ff7f50",
                    },
                  },
                  marginBottom: 3,
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ff7f50",
                    },
                  },
                  marginBottom: 2,
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
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ff7f50",
                    },
                  },
                  marginBottom: 3,
                }}
              />
            </>
          )}
          {/* Botões de Ação */}
          <CardActions sx={{ justifyContent: "center" }}>
            <Box width="100%">
              {isCreating ? (
                <Button
                  variant="contained"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  endIcon={
                    isLoading ? (
                      <CircularProgress
                        variant="indeterminate"
                        color="inherit"
                        size={20}
                      />
                    ) : undefined
                  }
                  sx={{
                    backgroundColor: "#ff7f50",
                    width: "100%",
                    padding: "12px",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "#e68929",
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
                  endIcon={
                    isLoading ? (
                      <CircularProgress
                        variant="indeterminate"
                        color="inherit"
                        size={20}
                      />
                    ) : undefined
                  }
                  sx={{
                    backgroundColor: "#ff7f50",
                    width: "100%",
                    padding: "12px",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "#e68929",
                    },
                  }}
                >
                  Entrar
                </Button>
              )}
            </Box>
          </CardActions>
          {/* Alternar entre telas */}
          <CardActions sx={{ justifyContent: "center" }}>
            <Box width="100%">
              <Button
                onClick={toggleForm}
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#ff7f50",
                  width: "100%",
                  padding: "12px",
                  borderRadius: "20px",
                  border: "1px solid #ff7f50",
                  "&:hover": {
                    backgroundColor: "#f4f4f4",
                  },
                }}
              >
                {isCreating
                  ? "Já tem uma conta? Faça login"
                  : "Criar uma nova conta"}
              </Button>
            </Box>
          </CardActions>
        </Box>

        {/* Imagem ao lado */}
        <Box
          width="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "#fafafa",
            borderRadius: "0 10px 10px 0",
          }}
        >
          <img
            src="/login.jpg"
            alt="Imagem"
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
