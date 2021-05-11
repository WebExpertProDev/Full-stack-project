import React from "react"
import Head from "next/head"
import styled from "styled-components"
import Footer from "../components/Footer/Footer"

const Layout = styled.div`
  margin: 0;
  padding: 0;
`

const MainLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Housee - {title}</title>
      </Head>
      <Layout className="flex flex-col min-h-screen justify-between overflow-hidden">
        {children}
      </Layout>
      <Footer />
    </>
  )
}

export default MainLayout
