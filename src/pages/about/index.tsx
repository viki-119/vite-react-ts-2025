import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { getUrlSearchParams } from '../../common/utils';
import styles from './style.module.scss';

const initTabList = [
  {
    id: 'tab1',
    title: 'tab1',
    content: 'content1',
    className: styles.active,
  },
  {
    id: 'tab2',
    title: 'tab2',
    content: 'content2',
  },
  {
    id: 'tab3',
    title: 'tab3',
    content: 'content3',
  },
];

const About: React.FC = () => {
  const tabRef = React.useRef<HTMLDivElement>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [tabList, setTabList] = useState(initTabList);
  const params = useParams();
  const location = useLocation();
  const searchParams = getUrlSearchParams(location.search);
  console.log(params, searchParams);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entry => {
        let currentEntry = null;
        entry.forEach(item => {
          if (item.isIntersecting) {
            currentEntry = item.target;
          }
        });
        if (currentEntry) {
          const targetId = currentEntry.getAttribute('data-target');
          tabList.forEach(item => {
            item.className = item.id === targetId ? styles.active : '';
          });
          setTabList([...tabList]);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );
    parentRef.current?.childNodes.forEach(dom => {
      observer.observe(dom as Element);
    });
  }, []);

  const handleClick = (e: { target: Element }): void => {
    const targetId = e.target.getAttribute('id');
    tabList.forEach(item => {
      item.className = item.id === targetId ? styles.active : '';
    });
    setTabList([...tabList]);

    // 滚动内容元素
    parentRef.current?.childNodes.forEach(dom => {
      if (dom.getAttribute('data-target') === targetId) {
        dom.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  return (
    <div>
      <div
        style={{ display: 'flex', position: 'sticky', top: 0, background: 'white' }}
        ref={tabRef}
        id="tab-container"
        onClick={handleClick}
      >
        {tabList.map(tab => (
          <div key={tab.id} id={tab.id} className={tab.className}>
            {tab.title}
          </div>
        ))}
      </div>
      <div ref={parentRef}>
        {tabList.map(tab => (
          <div key={tab.id} data-target={tab.id} style={{ height: 500, paddingTop: '25px' }}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
