import { AlertCircle } from "lucide-react";
import type { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { Button } from "components/ui/button";

type alertData = {
  title: string;
  description: string;
  isError: boolean;
};
interface AlertProps {
  alertData: alertData;
  onClose: () => void;
  className: string;
}
export const AlertPopup: FC<AlertProps> = (props) => {
  const { alertData, onClose, className } = props;
  return (
    <Alert
      className={className}
      variant={alertData.isError ? "destructive" : "default"}
    >
      <AlertCircle className="h-6 w-6" />
      <AlertTitle className="sm:text-2xl">{alertData.title}</AlertTitle>
      <AlertDescription className="sm:text-lg">
        {alertData.description}
      </AlertDescription>
      <div className="flex  flex-row items-center justify-end">
        <Button
          variant={alertData.isError ? "destructive" : "default"}
          onClick={onClose}
          className="sm:text-xxl sm:p-6 "
        >
          Zamknij
        </Button>
      </div>
    </Alert>
  );
};
