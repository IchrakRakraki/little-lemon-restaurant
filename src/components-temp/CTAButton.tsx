import type { MouseEvent, FC } from "react";
import styled from "styled-components";

type ButtonProps = {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button = styled.button<{ type?: string }>`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.color.primary.light};
  border: none;
  color: ${({ theme }) => theme.color.highlight.dark};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.sm};
  width: auto;
  height: auto;
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.15s ease;

  &:hover:not(:disabled),
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 2px 4px 8px 2px rgba(73, 94, 87, 0.15);
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.color.primary.dark};
    color: ${({ theme }) => theme.color.highlight.light};
    transform: translateY(0);
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.color.highlight.light};
    color: ${({ theme }) => theme.color.mutedText};
    box-shadow: none;
    transform: none;
  }
`;

const CTAButton: FC<ButtonProps> = ({ buttonText, type = "button", disabled, onClick }) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled}>
      {buttonText}
    </Button>
  );
};

export default CTAButton;
