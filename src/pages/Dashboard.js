// shortened for clarity (core parts)

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Excel export
const exportExcel = () => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Attendance");

  const file = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([file]), "attendance.xlsx");
};

<button onClick={exportExcel}>Export Excel</button>