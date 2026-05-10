"use client";

import React from "react";
import { AppModal } from "../common/AppModal";
import { PackageFormData } from "@/lib/admin/types";
import { useCreatePackageMutation } from "@/appstore/modules/packages/api";
import { toast } from "react-toastify";
import { PackageForm } from "./PackageForm";

interface CreatePackagesProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePackages({ open, setOpen }: CreatePackagesProps) {
  const [createPackage] = useCreatePackageMutation();

  // ── Create ────────────────────────────────────────────────
  const onCreate = async (formData: PackageFormData) => {
    try {
      const result = await createPackage({
        name: formData.name,
        price: formData.price,
        status: formData.status,
      });

      if ("data" in result && (result.data as { success: boolean })?.success) {
        toast.success("Package তৈরি হয়েছে!");
        setOpen(false);
      } else {
        toast.error("Package তৈরিতে সমস্যা হয়েছে।");
      }
    } catch {
      toast.error("Package তৈরিতে সমস্যা হয়েছে।");
    }
  };

  return (
    <AppModal
      open={open}
      title="New package"
      onClose={() => setOpen(false)}
      width={480}
    >
      <PackageForm
        onSubmit={onCreate}
        isSubmitting={false}
        submitLabel="Create package"
      />
    </AppModal>
  );
}

export default CreatePackages;