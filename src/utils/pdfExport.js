import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Generic PDF Export Utility
 *
 * @param {Object} options
 * @param {string} options.title
 * @param {Array} options.columns
 * @param {Array} options.rows
 * @param {string} options.fileName
 */
export function exportToPDF({
  title,
  columns,
  rows,
  fileName,
}) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(79, 70, 229);
  doc.text(title, pageWidth / 2, 20, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setTextColor(120);

  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    pageWidth / 2,
    28,
    {
      align: "center",
    }
  );

  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 38,

    theme: "grid",

    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: "middle",
    },

    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },

    margin: {
      left: 12,
      right: 12,
    },
  });

  const totalPages = doc.internal.getNumberOfPages();

  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);

    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.text(
      `Page ${page} of ${totalPages}`,
      pageWidth - 20,
      doc.internal.pageSize.getHeight() - 10,
      {
        align: "right",
      }
    );
  }

  doc.save(fileName);
}