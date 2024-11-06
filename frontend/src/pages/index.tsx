import { BarraInicialHome } from "@/shared/components/barra-inicial/BarraInicialHome";
import CalendarioPrincipal from "./dashboard/CalendarioPrincipal/CalendarioPrincipal";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/shared/contexts/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login/Login");
    } else {
      router.push("/dashboard/CalendarioPrincipal/CalendarioPrincipal");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <></>
  );
}
