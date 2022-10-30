import { rq } from '../../services';

const Route = '/employees';

export const get = () => {
  return rq.get(Route);
};

export default {
  get,
};
