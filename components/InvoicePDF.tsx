import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Defs, LinearGradient, Stop, Rect, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    paddingBottom: 40, // Add padding to bottom of page
  },
  headerContainer: {
    height: 350,
    paddingHorizontal: 80,
    paddingTop: 50,
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },

  // Left Column
  title: { fontSize: 48, fontWeight: 'bold', marginBottom: 2 },
  invoiceId: { fontSize: 12, opacity: 0.9, marginBottom: 10 },
  label: { fontSize: 9, opacity: 0.9, marginBottom: 2 },
  clientName: { fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
  normalText: { fontSize: 10, lineHeight: 1.4 },

  // Right Column
  rightColumn: { alignItems: 'flex-end' },
  totalLabel: { fontSize: 10, opacity: 0.9, textAlign: 'right' },
  totalBig: { fontSize: 28, fontWeight: 'bold', textAlign: 'right' },
  dateRow: { flexDirection: 'row', gap: 25, marginTop: 15, marginBottom: 20 },
  dateItem: { alignItems: 'flex-end' },
  dateValue: { fontSize: 11, fontWeight: 'bold' },

  // The White Card
  cardContainer: {
    marginHorizontal: 80,
    marginTop: -80,
    backgroundColor: '#fff',
    borderRadius: 15,
  },

  // Table
  tableContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#EFF2F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headerText: { fontSize: 9, color: '#555', fontWeight: 'bold' },

  // Rows
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 5,
    alignItems: 'center',
    borderRadius: 8,
  },
  rowText: { fontSize: 10, color: '#333' },

  // Footer inside card
  cardFooter: {
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  // Grand Total Button
  grandTotalButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
  },

  // Bottom Page Info (UPDATED to follow content)
  bottomInfo: {
    marginTop: 10, // Fixed gap from the card
    marginHorizontal: 80, // Align with the rest
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: { fontSize: 8, color: '#666' }
});

const formatCurrency = (num: number) => "Rp" + num.toLocaleString('id-ID');

export const InvoicePDF = ({ data }: { data: any }) => {
  // Calculate dynamic height based on number of items
  // Base height (Header + Footer + Margins) ~= 600
  // Item height ~= 40
  const minHeight = 600 + (data.items.length * 40);

  return (
    <Document>
      <Page size={[595.28, minHeight]} style={styles.page}>

        {/* 1. Header */}
        <View style={styles.headerContainer}>
          <Svg style={styles.headerBackground}>
            <Defs>
              <LinearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#FF7B00" />
                <Stop offset="0.8" stopColor="#C40700" />
              </LinearGradient>
            </Defs>
            <Rect width="1000" height="300" fill="url(#grad1)" />
          </Svg>

          {/* Left Column */}
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
              <Image
                src="/image 46.png"
                style={{ width: 30, height: 30, marginRight: 10, borderRadius: 15 }}
              />
              <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Konsultan Data</Text>
                <Text style={{ fontSize: 8, opacity: 0.8 }}>Department of Data Analytics GSB IPB</Text>
              </View>
            </View>

            <Text style={styles.title}>Invoice</Text>
            <Text style={styles.invoiceId}>{data.invoiceNumber}</Text>

            <Text style={styles.label}>Invoice to</Text>
            <Text style={styles.clientName}>{data.clientName}</Text>
            <Text style={styles.normalText}>{data.clientLocation}</Text>
            <Text style={styles.normalText}>{data.clientPhone}</Text>
            <Text style={styles.normalText}>{data.clientEmail}</Text>
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <Text style={styles.totalLabel}> </Text>
            <Text style={styles.totalLabel}> </Text>
            <Text style={styles.totalLabel}> </Text>
            <Text style={styles.totalLabel}> </Text>
            <Text style={styles.totalLabel}> </Text>
            <Text style={styles.totalLabel}>Total Due</Text>
            <Text style={styles.totalBig}>{formatCurrency(data.total)}</Text>

            <View style={styles.dateRow}>
              <View style={styles.dateItem}>
                <Text style={styles.label}>Invoice Date</Text>
                <Text style={styles.dateValue}>{data.today}</Text>
              </View>
              <View style={styles.dateItem}>
                <Text style={styles.label}>Due Date</Text>
                <Text style={styles.dateValue}>{data.dueDate}</Text>
              </View>
            </View>

            <Text style={[styles.label, { marginTop: 0 }]}>Payment to</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{data.paymentNumber}</Text>
            <Text style={styles.normalText}>{data.paymentName}</Text>
          </View>
        </View>

        {/* 2. The Card */}
        <View style={styles.cardContainer}>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, { flex: 3 }]}>Item Description</Text>
              <Text style={[styles.headerText, { flex: 0.5, textAlign: 'center' }]}>Qty</Text>
              <Text style={[styles.headerText, { flex: 1, textAlign: 'right' }]}>Rate</Text>
              <Text style={[styles.headerText, { flex: 1.5, textAlign: 'right' }]}>Amount</Text>
            </View>

            {data.items.map((item: any, i: number) => (
              <View key={i} style={[
                styles.row,
                { backgroundColor: i % 2 !== 0 ? '#EFF2F6' : '#fff' }
              ]}>
                <Text style={[styles.rowText, { flex: 3, fontWeight: 'bold' }]}>{item.description}</Text>
                <Text style={[styles.rowText, { flex: 0.5, textAlign: 'center' }]}>{item.qty}</Text>
                <Text style={[styles.rowText, { flex: 1, textAlign: 'right' }]}>{formatCurrency(item.rate)}</Text>
                <Text style={[styles.rowText, { flex: 1.5, textAlign: 'right', fontWeight: 'bold' }]}>
                  {formatCurrency(item.qty * item.rate)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.cardFooter}>
            <View style={{ width: '50%' }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 4 }}>Syarat dan Ketentuan</Text>
              <Text style={{ fontSize: 7, color: '#666', lineHeight: 1.3 }}>
                Pembayaran yang sudah dibayarkan dan/atau sudah disetujui sebelumnya tidak dapat dikembalikan/di-refund
              </Text>

              <Text style={{ fontSize: 9, fontWeight: 'bold', marginTop: 15 }}>Best Regards,</Text>
              <Text style={{ fontSize: 9, marginTop: 50 }}>Data Analytics Director</Text>
            </View>

            <View style={styles.grandTotalButton}>
              <Svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <Defs>
                  <LinearGradient id="btnGrad" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#0038A8" />
                    <Stop offset="1" stopColor="#001952" />
                  </LinearGradient>
                </Defs>
                <Rect width="1000" height="1000" fill="url(#btnGrad)" />
              </Svg>
              <Text style={{ color: 'white', fontSize: 9, marginRight: 5, position: 'relative' }}>Grand Total</Text>
              <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold', position: 'relative' }}>{formatCurrency(data.total)}</Text>
            </View>
          </View>
        </View>

        {/* 3. Bottom Footer Info (Relative Position) */}
        <View style={styles.bottomInfo}>
          <View>
            <Text style={styles.bottomText}>16680</Text>
            <Text style={styles.bottomText}>dataanalytics.gsb@gmail.com</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.bottomText}>Sekretariat GSB IPB Gedung Student Center FMIPA</Text>
            <Text style={styles.bottomText}>IPB, Jln. Meranti, Kampus IPB-Darmaga Bogor</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
};