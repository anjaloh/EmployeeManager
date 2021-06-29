export type ConfirmDialogProps = {
  dialogHeader: string;
  dialogBody: string;
  confirmButtonText: string;
  confirmButtonColor?: string;
  showConfirmDialog: boolean;
  setShowConfirmDialog: (v: boolean) => void;
};
