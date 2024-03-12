import { Card } from "@/components/Card";
import { useData } from "@/providers/Data";
import { useNavigate } from "react-router-dom";
import { RandomTestForm } from "../components/RandomTestForm";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import { CustomTestForm } from "../components/CustomTestForm";
import { CustomTestFormType, RandomTestFormType } from "..";
import { AnimatedPage } from "@/components/UI/AnimatedPage";

type TypesOfTest = "custom" | "random";

export const NewTestPage: React.FC = () => {
  const { t } = useTranslation();

  const { actions } = useData();
  const navigate = useNavigate();

  async function onSubmitCustom(data: CustomTestFormType) {
    await actions.createCustomTest(data);
    navigate("../../", { replace: true });
  }

  async function onSubmitRandom(data: RandomTestFormType) {
    await actions.createRandomTest(data);
    navigate("../../", { replace: true });
  }

  const [typeOfTest, setTypeOfTest] = useState<TypesOfTest>("custom");

  return (
    <AnimatedPage>
      <Card>
        <Card.Title disableNewButton>{t("tests.forms.new.title")}</Card.Title>
        <div className="flex w-full gap-2">
          <TypeButton
            thisType="custom"
            typeOfTest={typeOfTest}
            setTypeOfTest={setTypeOfTest}
          >
            {t("tests.forms.custom.button")}
          </TypeButton>
          <TypeButton
            thisType="random"
            typeOfTest={typeOfTest}
            setTypeOfTest={setTypeOfTest}
          >
            {t("tests.forms.random.button")}
          </TypeButton>
        </div>
        {typeOfTest === "custom" ? (
          <CustomTestForm
            title={t("tests.forms.custom.title")}
            subtitle={t("tests.forms.custom.subtitle")}
            onSubmit={onSubmitCustom}
          />
        ) : (
          <RandomTestForm
            title={t("tests.forms.random.title")}
            subtitle={t("tests.forms.random.subtitle")}
            onSubmit={onSubmitRandom}
          />
        )}
      </Card>
    </AnimatedPage>
  );
};

interface TypeButtonProps extends React.PropsWithChildren {
  thisType: TypesOfTest;
  typeOfTest: TypesOfTest;
  setTypeOfTest: React.Dispatch<React.SetStateAction<TypesOfTest>>;
}

const TypeButton: React.FC<TypeButtonProps> = ({
  thisType,
  typeOfTest,
  setTypeOfTest,
  children,
}) => {
  const typeButtonBaseClass =
    "flex flex-grow justify-center rounded p-2 shadow ring-2 ring-primary hover:bg-item-hover bg-item-default";
  const typeButtonActiveCLass =
    "bg-selected-default ring-selected font-bold hover:bg-selected-hover";

  return (
    <div
      onClick={() => setTypeOfTest(thisType)}
      className={twMerge(
        typeButtonBaseClass,
        thisType === typeOfTest && typeButtonActiveCLass,
      )}
    >
      {children}
    </div>
  );
};
