import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
};

const CRform = ({ children, onSubmit, defaultValues }: TProps) => {
  const formConfig: Record<string, any> = {};
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default CRform;
