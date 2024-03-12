import { PropsWithChildren } from "react";
import { Title } from "./Title";
import { twMerge } from "tailwind-merge";

interface StyleProps {
  background: string;
}

interface CardProps extends PropsWithChildren {
  className?: string;
  style?: "default" | "stats";
  styleProps?: StyleProps;
}

interface CardComponent extends React.FC<CardProps> {
  Title: typeof Title;
}

const Card: CardComponent = ({
  children,
  className,
  style = "default",
  styleProps,
}) => {
  const baseClass =
    "animated relative m-auto my-10 flex max-w-screen-md flex-col gap-10 rounded bg-card px-10 py-8 text-primary shadow";
  const statsClass = "text-white shadow-lg gap-5";
  const statsStyle = {
    background: styleProps?.background,
    zIndex: "1",
  };
  return (
    <div
      className={twMerge(baseClass, style === "stats" && statsClass, className)}
      style={style === "stats" ? statsStyle : {}}
    >
      {children}
      {style === "stats" && (
        <div
          className="absolute left-0 top-0 size-full rounded"
          style={{
            zIndex: "-1",
            background:
              "radial-gradient(200% 400% at 50% 50%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        />
      )}
      {style === "default" && (
        <div className="m-auto h-0.5 w-64 rounded bg-main" />
      )}
    </div>
  );
};

Card.Title = Title;

export { Card };
