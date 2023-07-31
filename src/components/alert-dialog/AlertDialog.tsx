import React, { forwardRef } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import clsx from 'clsx';
import styles from './AlertDialog.module.scss';
import { QueueButtonProps } from 'components/button/Button';
import { QUEUE_UI_SIZE, QUEUE_UI_SIZES } from 'styles/ui/Size';
import { QUEUE_UI_COLOR, QUEUE_UI_COLORS } from 'styles/ui/Color';
import { useTranslation } from 'react-i18next';
import { useRootRenderer } from 'cdk/root-renderer/root-renderer';

export const QueueAlertDialogRoot = ({ children, ...props }: AlertDialog.AlertDialogProps) => {
  return <AlertDialog.Root {...props}>{children}</AlertDialog.Root>;
};

export const QueueAlertDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  Omit<AlertDialog.AlertDialogTriggerProps, 'className'>
>(({ children, ...props }, ref) => {
  return (
    <AlertDialog.Trigger ref={ref} {...props}>
      {children}
    </AlertDialog.Trigger>
  );
});

export const QueueAlertDialogPortal = ({ children, ...props }: AlertDialog.AlertDialogProps) => {
  return <AlertDialog.Portal {...props}>{children}</AlertDialog.Portal>;
};

export const QueueAlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  AlertDialog.AlertDialogOverlayProps
>(({ children, className, ...props }, ref) => {
  return (
    <AlertDialog.Overlay ref={ref} {...props} className={clsx(styles.AlertDialogOverlay, className)}>
      {children}
    </AlertDialog.Overlay>
  );
});

export const QueueAlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialog.AlertDialogContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <AlertDialog.Content ref={ref} {...props} className={clsx(styles.AlertDialogContent, className)}>
      {children}
    </AlertDialog.Content>
  );
});

export const QueueAlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  QueueButtonProps & AlertDialog.AlertDialogActionProps
>(({ children, className, size = QUEUE_UI_SIZE.MEDIUM, color = QUEUE_UI_COLOR.DEFAULT, ...props }, ref) => {
  return (
    <AlertDialog.Action
      ref={ref}
      {...props}
      className={clsx(styles.AlertDialogAction, className, styles[size], styles[color])}>
      {children}
    </AlertDialog.Action>
  );
});

export const QueueAlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  QueueButtonProps & AlertDialog.AlertDialogCancelProps
>(({ children, className, size = QUEUE_UI_SIZE.MEDIUM, color = QUEUE_UI_COLOR.DEFAULT, ...props }, ref) => {
  return (
    <AlertDialog.Cancel
      ref={ref}
      {...props}
      className={clsx(styles.AlertDialogCancel, className, styles[size], styles[color])}>
      {children}
    </AlertDialog.Cancel>
  );
});

export const QueueAlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  AlertDialog.AlertDialogTitleProps
>(({ children, className, ...props }, ref) => {
  return (
    <AlertDialog.Title ref={ref} {...props} className={clsx(styles.AlertDialogTitle, className)}>
      {children}
    </AlertDialog.Title>
  );
});

export const QueueAlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialog.AlertDialogDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <AlertDialog.Description ref={ref} {...props} className={clsx(styles.AlertDialogDescription, className)}>
      {children}
    </AlertDialog.Description>
  );
});

export interface QueueAlertDialogFooterProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const QueueAlertDialogFooter = forwardRef<
  HTMLDivElement,
  QueueAlertDialogFooterProps
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={clsx(styles.AlertDialogFooter, className)}>
      {children}
    </div>
  );
});

export interface QueueSimpleAlertDialogProps {
  /**
   * @description
   * Modal 의 헤더에 들어가는 내용
   */
  title: JSX.Element | string;

  /**
   * @description
   * Modal 의 본문에 들어가는 내용
   */
  description: JSX.Element | string;

  /**
   * @description
   * Modal 의 열림 여부
   */
  opened?: boolean;

  /**
   * @description
   * Modal 의 기본 열림 여부
   */
  defaultOpen?: boolean;

  /**
   * @description
   * Modal 의 열림 여부가 변경될 때 호출되는 콜백 함수
   */
  onOpenChange?: (opened: boolean) => void;

  buttons?: {
    label: string | JSX.Element;
    size?: QUEUE_UI_SIZES;
    color?: QUEUE_UI_COLORS;
    onClick?: () => void;
  }[];

  onAction?: () => void;
}

export const QueueSimpleAlertDialog = ({
  title,
  description,
  opened = false,
  defaultOpen = false,
  buttons,
  onOpenChange,
  onAction,
}: QueueSimpleAlertDialogProps) => {
  const { t } = useTranslation();
  return (
    <QueueAlertDialog.Root open={opened} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      <QueueAlertDialog.Overlay />
      <QueueAlertDialog.Content asChild={false}>
        {title && <QueueAlertDialog.Title>{title}</QueueAlertDialog.Title>}
        {description && <QueueAlertDialog.Description>{description}</QueueAlertDialog.Description>}
        <QueueAlertDialog.Footer>
          <QueueAlertDialog.Cancel size={QUEUE_UI_SIZE.MEDIUM} color={QUEUE_UI_COLOR.RED}>
            {t('global.cancel')}
          </QueueAlertDialog.Cancel>
          <QueueAlertDialog.Action size={QUEUE_UI_SIZE.MEDIUM} color={QUEUE_UI_COLOR.BLUE} onClick={onAction}>
            {t('global.confirm')}
          </QueueAlertDialog.Action>

          {buttons?.map((button, index) => (
            <QueueAlertDialog.Action
              key={index}
              size={button.size || QUEUE_UI_SIZE.MEDIUM}
              color={button.color || QUEUE_UI_COLOR.BLUE}
              onClick={button.onClick}>
              {button.label}
            </QueueAlertDialog.Action>
          ))}
        </QueueAlertDialog.Footer>
      </QueueAlertDialog.Content>
    </QueueAlertDialog.Root>
  );
};

export const useAlertDialog = () => {
  const rootRenderer = useRootRenderer();
  return {
    open: (params: QueueSimpleAlertDialogProps) => {
      rootRenderer.render(<QueueSimpleAlertDialog {...params} />);
    },
  };
};

export const QueueAlertDialog = {
  Root: QueueAlertDialogRoot,
  Trigger: QueueAlertDialogTrigger,
  Portal: QueueAlertDialogPortal,
  Overlay: QueueAlertDialogOverlay,
  Content: QueueAlertDialogContent,
  Action: QueueAlertDialogAction,
  Cancel: QueueAlertDialogCancel,
  Title: QueueAlertDialogTitle,
  Description: QueueAlertDialogDescription,
  Footer: QueueAlertDialogFooter,
  SimpleAlert: QueueSimpleAlertDialog,
};
