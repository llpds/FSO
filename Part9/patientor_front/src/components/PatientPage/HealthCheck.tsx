import { HealthCheckRating } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';

type colors = "success" | "warning" | "error" | "action" | "disabled" | "inherit" | "primary" | "secondary" | "info";

interface HCRProps {
  healthCheckRating: HealthCheckRating
}

const HealthCheck = ({healthCheckRating}: HCRProps) => {

  const colors: colors[] = ['success', 'warning', 'error', 'action'];
  return (
    <div>
      <FavoriteIcon color={colors[healthCheckRating]} />
    </div>
  );
};

export default HealthCheck;