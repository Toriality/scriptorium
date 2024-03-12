import { twMerge } from "tailwind-merge";

interface FormProps extends React.PropsWithChildren {
  className?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

interface FormComponent extends React.FC<FormProps> {
  Title: React.FC<FormProps>;
  Subtitle: React.FC<FormProps>;
  Body: React.FC<FormProps>;
}

const Form: FormComponent = ({ children, className, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={twMerge(className, "w-full")}>
      {children}
    </form>
  );
};

const FormTitle: React.FC<FormProps> = ({ children, className }) => {
  return (
    <h2 className={twMerge(className, "text-lg font-semibold")}>{children}</h2>
  );
};

const FormSubtitle: React.FC<FormProps> = ({ children, className }) => {
  return <p className={twMerge(className, "text-sm")}>{children}</p>;
};

const FormBody: React.FC<FormProps> = ({ children, className }) => {
  return <div className={twMerge(className, "my-8 w-full")}>{children}</div>;
};

Form.Title = FormTitle;
Form.Subtitle = FormSubtitle;
Form.Body = FormBody;

export { Form };
