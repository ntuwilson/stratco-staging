import React from 'react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import WorkIndex from '@/components/site/WorkIndex';

export default function WorkIndexPage() {
  return (
    <div className="s-site">
      <SiteNav />
      <main>
        <WorkIndex />
      </main>
      <SiteFooter />
    </div>
  );
}
