import { useState } from 'react';

export const useControlOpen = (props: {
  open?: boolean;
  defaultOpen?: boolean;
  onCollapse?: (open: boolean) => void;
}) => {
  const [open, setOpen] = useState<boolean>(props.defaultOpen || false);

  const getOpen = () => {
    if (props.open !== undefined) {
      return props.open;
    }
    return open;
  };

  const changeOpen = (open: boolean) => {
    props.onCollapse?.(open);
    if (props.open === undefined) {
      setOpen(open);
    }
  };

  return {
    open: getOpen(),
    setOpen: changeOpen,
  };
};
