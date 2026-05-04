import dynamic from 'next/dynamic';

const BranchPage = dynamic(() => import('@/components/admin/Branch/BranchPage'), {
  ssr: false,           // This is the key
  loading: () => <p>Loading branches...</p>,
});
import React from "react";

const page = () => {
  return (
    <>
      <BranchPage />
    </>
  );
};

export default page;
