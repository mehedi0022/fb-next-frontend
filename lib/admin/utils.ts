export const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US",{
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
  };