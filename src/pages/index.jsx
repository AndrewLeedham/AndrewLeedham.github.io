import React from 'react';

import Layout from '../components/Layout';
import Header from '../components/Header';
import SEO from '../components/SEO';
import Split from '../components/Split';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`andrew`, `leedham`, `react`]} />
    <Split>
      <Header />
      <Header />
    </Split>
  </Layout>
);

export default IndexPage;
