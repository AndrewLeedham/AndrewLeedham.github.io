import React from 'react';

import Layout from '../components/Layout';
import Header from '../components/Header';
import SEO from '../components/SEO';
import Split from '../components/Split';
import Blog from '../components/Blog';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`andrew`, `leedham`, `react`]} />
    <Split>
      <Header />
      <Blog />
    </Split>
  </Layout>
);

export default IndexPage;
