import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "85%",
    border: "1px solid #000",
    margin: "0 auto",
  },
  row: { flexDirection: "row", borderBottom: "1px solid #000" },
  cell: { padding: 8, fontSize: "10px", fontWeight: "bold" },
  tableHead: {
    backgroundColor: "grey",
  },
  headCell: { fontSize: "12px", fontWeight: "bold" },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

function ReportPDFDoc({ reportData }) {
  const totalAmount = reportData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.payableAmount;
  }, 0);
  const totalDiscount = reportData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.discount;
  }, 0);
  const totalVat = reportData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.vat;
  }, 0);

  console.log(totalAmount);

  return (
    <Document>
      <Page>
        <Text style={{ textAlign: "center",marginTop:"30px" }}>
          Restaurant Management System
        </Text>
        <View style={{marginLeft: "100px" }}>
          <Text style={{ fontSize: "12px" }}>
            Date:{new Date().toISOString()}
          </Text>
          <Text style={{ fontSize: "12px" }}>
            Total Price: {totalAmount.toFixed(2)} Tk.
          </Text>
          <Text style={{ fontSize: "12px" }}>
            Total Discount:{totalDiscount.toFixed(2)}
          </Text>
          <Text style={{ fontSize: "12px" }}>
            Total Discount:{totalVat.toFixed(2)}
          </Text>
        </View>

        {/* Table Area:: */}

        <View style={styles.table}>
          <View style={[styles.row, styles.tableHead]}>
            <View style={[styles.cell, styles.headCell, { width: "10%" }]}>
              <Text>Serial</Text>
            </View>
            <View style={[styles.cell, styles.headCell, { width: "10%" }]}>
              <Text>Table</Text>
            </View>
            <View style={[styles.cell, styles.headCell, { width: "20%" }]}>
              <Text>Sub total</Text>
            </View>
            <View style={[styles.cell, styles.headCell, { width: "20%" }]}>
              <Text>VAT</Text>
            </View>
            <View style={[styles.cell, styles.headCell, { width: "20%" }]}>
              <Text>Discount</Text>
            </View>
            <View style={[styles.cell, styles.headCell, { width: "20%" }]}>
              <Text>Total</Text>
            </View>
          </View>

          {reportData.map((data, Idx) => {
            return (
              <View style={styles.row} key={Idx}>
                <View style={[styles.cell, { width: "10%" }]}>
                  <Text style={styles.serial}>{Idx + 1}</Text>
                </View>
                <View style={[styles.cell, { width: "10%" }]}>
                  <Text>{data.tableCode ? data.tableCode : "N/A"}</Text>
                </View>
                <View style={[styles.cell, { width: "20%" }]}>
                  <Text>{data.subTotalPrice}</Text>
                </View>
                <View style={[styles.cell, { width: "20%" }]}>
                  <Text>{data.vat}</Text>
                </View>
                <View style={[styles.cell, { width: "20%" }]}>
                  <Text>{data.discount}</Text>
                </View>
                <View style={[styles.cell, { width: "20%" }]}>
                  <Text>{data.payableAmount}</Text>
                </View>
              </View>
            );
          })}

          {/* Add more rows as needed */}
        </View>
        {/* // :::Page Number:::  /*/}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}

export default ReportPDFDoc;
