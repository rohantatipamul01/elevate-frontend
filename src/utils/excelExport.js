import * as XLSX from "xlsx";

/**
 * Generic Excel Export Utility
 *
 * @param {Object} options
 * @param {Array<Object>} options.data
 * @param {string} options.sheetName
 * @param {string} options.fileName
 */
export function exportToExcel({
  data,
  sheetName = "Sheet1",
  fileName = "Report.xlsx",
}) {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn("No data available for Excel export.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    sheetName
  );

  XLSX.writeFile(workbook, fileName);
}