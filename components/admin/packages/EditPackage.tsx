// =============================
// FIXED EditPackage.tsx
// =============================
"use client";

import { AppModal } from "../common/AppModal";
import { PackageFormData, PackageItem } from "@/lib/admin/types";
import { toast } from "react-toastify";
import { useUpdatePackageMutation } from "@/appstore/modules/packages/api";
import { Dispatch, SetStateAction, useState } from "react";
import { PackageForm } from "./PackageForm";

interface EditPackageProps {
  openEdit: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
  selectedPkg: PackageItem | null;
  setSelectedPkg: Dispatch<SetStateAction<PackageItem | null>>;
}

function EditPackage({
  openEdit,
  setEditOpen,
  selectedPkg,
  setSelectedPkg,
}: EditPackageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatePackage] = useUpdatePackageMutation();

  const onUpdate = async (formData: PackageFormData) => {
    if (!selectedPkg) return;

    setIsSubmitting(true);

    try {
      const result = await updatePackage({
        id: selectedPkg.id,
        ...formData,
      });

      if ("data" in result && (result.data as { success: boolean })?.success) {
        toast.success("Package আপডেট হয়েছে!");
        setEditOpen(false);
        setSelectedPkg(null);
      } else {
        toast.error("আপডেটে সমস্যা হয়েছে।");
      }
    } catch {
      toast.error("আপডেটে সমস্যা হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppModal
      open={openEdit}
      title={`Edit — ${selectedPkg?.name ?? ""}`}
      onClose={() => {
        setEditOpen(false);
        setSelectedPkg(null);
      }}
      width={480}
    >
      <PackageForm
        onSubmit={onUpdate}
        isSubmitting={isSubmitting}
        defaultValues={
          selectedPkg
            ? {
                name: selectedPkg.name,
                price: selectedPkg.price,
                status: selectedPkg.status,
              }
            : undefined
        }
        submitLabel="Save changes"
      />
    </AppModal>
  );
}

export default EditPackage;