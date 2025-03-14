import {useParams, useLocation} from 'react-router-dom';
import { getUrlSearchParams } from '../../common/utils';

export default function About() {
  const params = useParams();
  const location = useLocation();
  const searchParams = getUrlSearchParams(location.search);
  console.log(params, searchParams);
  return (
    <div>About</div>
  )
}