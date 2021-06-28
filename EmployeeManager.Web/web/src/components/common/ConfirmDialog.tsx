import React, { useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { ConfirmDialogProps } from '../../types/ConfirmDialogProps';

export const ConfirmDialog = ({
  dialogHeader,
  dialogBody,
  confirmButtonColor,
  confirmButtonText,
  showConfirmDialog,
  setShowConfirmDialog,
}: ConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);

  const onCancel = () => {
    setIsOpen(false);
    setShowConfirmDialog(false);
  };

  const onConfirm = () => {
    setIsOpen(false);
    setShowConfirmDialog(false);
  };

  useEffect(() => {
    setIsOpen(showConfirmDialog);
  }, [showConfirmDialog]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {dialogHeader}
          </AlertDialogHeader>

          <AlertDialogBody>{dialogBody}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              Cancel
            </Button>
            <Button
              colorScheme={confirmButtonColor || 'red'}
              onClick={onConfirm}
              ml={3}
            >
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
