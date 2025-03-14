import React from 'react';
import {useParams, useLocation} from 'react-router-dom';

import { getUrlSearchParams } from '../../common/utils';

const About: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const searchParams = getUrlSearchParams(location.search);
  console.log(params, searchParams);
  return (
    <div>About</div>
  )
}

export default About;