import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import DynamicFormFields from "../../components/forms/dynamicFormFields";
import { userSchema } from "../../schema/usersSchema";
import { addUsersReq, updateUsersReq } from "../../services/api/users/usersApi";
import { FormFieldConfigType } from "../../types/formsTypes";
import { getUserFormFields } from "./formFields";
import {
  closeAllEditAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";

type UsersValues = z.infer<typeof userSchema>;

const EditUsersForm: React.FC = () => {
  const editData = useEditMgmtStore((s) => s.editUser);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UsersValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", phone: "", email: "", password: "" },
  });

  useEffect(() => {
    if (editData?.userId) {
      reset({
        name: editData?.name,
        phone: editData?.phone,
        email: editData?.email || "",
        password: editData?.password || "",
      });
    }
  }, [editData]);

  const onCancelOrClose = () => {
    closeAllEditAction();
  };

  const onSubmit = async (data: UsersValues) => {
    try {
      const reqBody = {
        name: data?.name,
        phone: data?.phone,
        email: data?.email || "",
        password: data?.password || "",
      };
      await updateUsersReq(editData?.userId || "", reqBody);
      toast.success("User updated successfully!");
      onCancelOrClose();
      reset();
    } catch (error: any) {
      toast.error(error?.errorMsg || "Failed to update User");
    }
  };

  const formFields: FormFieldConfigType[] = useMemo(
    () => getUserFormFields(),
    []
  );

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        User
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicFormFields
            control={control}
            errors={errors}
            fields={formFields}
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md bg-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? "Updating..." : "Update User"}
          </button>

          <button
            type="button"
            onClick={() => onCancelOrClose()}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUsersForm;
