import React from 'react'

import { Page, Text, View, StyleSheet, Document } from '@react-pdf/renderer'
import { User } from '../shared/types'

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    fontSize: '16px',
  },
  title: {
    fontSize: '16px',

    fontWeight: 'bold',
  },
  border: {
    borderBottom: '1px solid #eee',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    fontSize: '15px',
  },
})
interface PropTypes {
  data: User | undefined
}
function Pdfinfo({ data }: PropTypes) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Personal Information</Text>
        </View>
        <View style={styles.wrap}>
          <View style={styles.section}>
            <Text style={styles.title}>Name : </Text>
            <Text>
              {data?.firstName} {data?.lastName}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Email : </Text>
            <Text>{data?.email}</Text>
          </View>
        </View>
        <View style={styles.wrap}>
          <View style={styles.section}>
            <Text style={styles.title}>Phone : </Text>
            <Text>{data?.mobileNumber}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Address : </Text>
            <Text>{data?.address}</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
        </View>
        <View style={styles.section}>
          {data?.skills.map((s, i) => (
            <Text style={styles.listItem} key={`${s}-${i}`}>
              * {s}
            </Text>
          ))}
        </View>
        <View style={styles.border} />
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
        </View>
        <View style={styles.section}>
          {data?.education.map((e, i) => (
            <Text style={styles.listItem} key={`${e}-${i}`}>
              * {e}
            </Text>
          ))}
        </View>

        <View style={styles.border} />
        <View style={styles.section}>
          <Text style={styles.heading}>Projects</Text>
        </View>
        <View style={styles.section}>
          {data?.projects.map((p, i) => (
            <Text style={styles.listItem} key={`${p}-${i}`}>
              * {p}
            </Text>
          ))}
        </View>

        <View style={styles.border} />
        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>
        </View>
        <View style={styles.section}>
          {data?.experience.map((e, i) => (
            <Text style={styles.listItem} key={`${e}-${i}`}>
              * {e}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default Pdfinfo
